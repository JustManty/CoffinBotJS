const { SlashCommandBuilder } = require('discord.js');
const { rankSubmissionChannelId } = require('./../../config/config')
const { getChannelURL} = require("../../utility/discordUtil");
const { guildId} = require("../../config/config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ranks')
        .setDescription('Shares the requirements to reach various ranks in Iron Coffin.'),
    async execute(interaction) {
        let reply = 'Experience Required in the clan per rank:\n' +
            '```Recruit      - 0 \n' +
            'Corporal     - 5 Million\n' +
            'Sergeant     - 25 Million\n' +
            'Lieutenant   - 100 Million\n' +
            'Captain      - 250 Million\n' +
            'General      - 500 Million\n' +
            'Admin        - 1 Billion\n' +
            'Organizer    - 6 months membership + any Araxxi broadcast + igneous stone from Zuk\n' +
            'Coordinator  - organizer requirements + any one boss log above GWD2 of your choice picked from the following:\n' +
            '\n' +
            'Araxxi                       | AOD\n' +
            'Arch-Glacor                  | Raksha\n' +
            'Barrows: Rise of the Six     | Rasial\n' +
            'Any Elite Dungeon log        | Rex Matriarchs\n' +
            'Kalphite King                | Solak\n' +
            'Kerapac                      | Telos\n' +
            'Legiones                     | Zuk\n' +
            'Raids (with at least 1 pet)  | Vorago\n' +
            'Nex                          | Vorkath```\n' +
            '\n' +
            'Ranks Recruit through General will be kicked after 6 months of inactivity. Those who meet Admin rank are granted permanent membership and will not be kicked for prolonged inactivity so long as they maintain their hardcore status.\n' +
            'Anyone is gracefully asked to leave should they lose their hardcore skull, and will be forcibly removed if they don\'t remove themselves. You\'re welcome to guest in the clan chat and the discord, or make a new hardcore and rejoin.\n' +
            '\n' +
            'To apply for organizer/coordinator please submit screenshot at ' + getChannelURL(guildId, rankSubmissionChannelId) + ' or dm a key for qc proof';

        await interaction.reply(reply);
    }
}