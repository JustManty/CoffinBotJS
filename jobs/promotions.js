require ('dotenv').config()

const { clan } = require ('runescape-api')
const MS_PER_HOUR = 3600000;
const hoursToMs = (hours) => hours * MS_PER_HOUR;

module.exports = {
    name: 'promotions',
    async start(client, env) {
        setInterval( () => {
                console.log('Pinging API');
                clan.getMembers('Iron Coffin').then((data) => {
                    for (const member of data) {
                        if(['Owner', 'Deputy Owner', 'Overseer', 'Coordinator', 'Organiser', 'Admin'].includes(member.rank)) {
                            // These ranks cannot earn a promotion through XP
                            continue;
                        }

                        let newRank = member.rank;

                        if (member.experience > 1000000000) {
                            newRank = 'Admin';
                        } else if (member.experience > 500000000) {
                            newRank = 'General';
                        } else if (member.experience > 250000000) {
                            newRank = 'Captain';
                        } else if (member.experience > 100000000) {
                            newRank = 'Lieutenant';
                        } else if (member.experience > 25000000) {
                            newRank = 'Sergeant';
                        } else if (member.experience > 5000000) {
                            newRank = 'Corporal';
                        }

                        if (member.rank !== newRank) {
                            client.channels.cache.get(env === 'PRD' ? process.env.RANKS_CHANNEL_PRD : process.env.RANKS_CHANNEL_DEV)
                                .send(`**${member.name}** has earned enough experience to rank up from ${member.rank} to ${newRank}!`)
                        }
                    }
                });
            }
            ,  hoursToMs(1))
    }
}
