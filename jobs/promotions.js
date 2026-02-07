require ('dotenv').config()

const { clan } = require ('runescape-api')
const logger = require ('../utility/logger');
const { ranksChannelId } = require ('./../config/config.js');
const { hoursToMs } = require ('./../utility/util.js');

let ranks = ['Recruit', 'Corporal', 'Sergeant', 'Lieutenant', 'Captain', 'General', 'Admin', 'Organiser', 'Coordinator', 'Overseer', 'Deputy Owner', 'Owner'];
let ignoredUsers = ['KirasFrost', 'Hardcore Rob']

module.exports = {
    name: 'promotions',
    async start(client) {
        let updateCount = 0;

        setInterval( () => {
                logger.info('Starting rank promotion job.');
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
                            if (ranks.indexOf(member.rank) > qualifiedRankIndex) {
                                client.channels.cache.get(ranksChannelId)
                                    .send(`:hcim: **${member.name}** is rank ${member.rank} but should only be ${ranks.at(qualifiedRankIndex)}! :hcim:`);
                            } else {
                                client.channels.cache.get(ranksChannelId)
                                    .send(`:hcim: **${member.name}** has earned enough experience to rank up from ${member.rank} to ${ranks.at(qualifiedRankIndex)}! :hcim:`);
                            }
                            updateCount++;
                        }
                    }

                    if (updateCount > 0) {
                        logger.info(`Notified updated ranks for ${updateCount} members.`);
                    } else {
                        logger.info('No rank updates notified.');
                    }
                });
            }
            ,  hoursToMs(1));
    }
}
