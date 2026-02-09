require ('dotenv').config()

const { clan } = require ('runescape-api')
const logger = require ('../utility/logger');
const { ranksChannelId } = require ('./../config/config.js');
const { hoursToMs } = require ('./../utility/util.js');

class Notification {
    constructor(name, currentRank, newRank) {
        this.name = name;
        this.currentRank = currentRank;
        this.newRank = newRank;
        this.lastNotified = Date.now();
    }

    notify() {
        this.lastNotified = Date.now();
    }

    matches(name, currentRank, newRank) {
        return this.name === name && this.currentRank === currentRank && this.newRank === newRank;
    }
}

let ranks = ['Recruit', 'Corporal', 'Sergeant', 'Lieutenant', 'Captain', 'General', 'Admin', 'Organiser', 'Coordinator', 'Overseer', 'Deputy Owner', 'Owner'];
let ignoredUsers = ['KirasFrost', 'Hardcore Rob']

module.exports = {
    name: 'promotions',
    async start(client) {
        let updateCount = 0;
        let notifications = [];

        setInterval(() => {
                logger.debug('Starting rank promotion job.');
                updateCount = 0;
                clan.getMembers('Iron Coffin').then((data) => {
                    for (const member of data) {
                        if(ignoredUsers.includes(member.name)) continue;

                        if(ranks.indexOf(member.rank) > ranks.indexOf('Admin')) {
                            // These ranks cannot earn a promotion through XP
                            continue;
                        }

                        let qualifiedRankIndex = 0;

                        if (member.experience > 1000000000) {
                            qualifiedRankIndex = 6;
                        } else if (member.experience > 500000000) {
                            qualifiedRankIndex = 5;
                        } else if (member.experience > 250000000) {
                            qualifiedRankIndex = 4;
                        } else if (member.experience > 100000000) {
                            qualifiedRankIndex = 3;
                        } else if (member.experience > 25000000) {
                            qualifiedRankIndex = 2;
                        } else if (member.experience > 5000000) {
                            qualifiedRankIndex = 1;
                        }

                        if (ranks.indexOf(member.rank) !== qualifiedRankIndex) {
                                const targetRank = ranks.at(qualifiedRankIndex);
                                const isDemotion = ranks.indexOf(member.rank) > qualifiedRankIndex;

                                const existing = notifications.find((n) =>
                                    n.matches(member.name, member.rank, targetRank)
                                );

                                const cooldownMs = hoursToMs(7.5);

                                if (!existing) {
                                    client.channels.cache.get(ranksChannelId).send(
                                        isDemotion
                                            ? `**${member.name}** is rank ${member.rank} but should only be ${targetRank}!`
                                            : `**${member.name}** has earned enough experience to rank up from ${member.rank} to ${targetRank}!`
                                    );

                                    updateCount++;
                                    notifications.push(new Notification(member.name, member.rank, targetRank));
                                } else if (Date.now() > existing.lastNotified + cooldownMs) {
                                    client.channels.cache.get(ranksChannelId).send(
                                        isDemotion
                                            ? `**${member.name}** is rank ${member.rank} but should only be ${targetRank}!`
                                            : `**${member.name}** has earned enough experience to rank up from ${member.rank} to ${targetRank}!`
                                    );

                                    updateCount++;
                                    existing.notify();
                                }
                            }
                    }

                    if (updateCount > 0) {
                        logger.info(`Notified updated ranks for ${updateCount} members.`);
                    } else {
                        logger.info('No rank updates notified.');
                    }
                });
                logger.debug('Rank promotion job finished.');
            },
            hoursToMs(1)
        );
    }
}
