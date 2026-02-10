const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gametime')
        .setDescription('Displays the current in-game time')
        .addBooleanOption(option => option.setName('Ephemeral').setDescription('Should this message be viewable only by you?')),
    async execute(interaction) {
        const d = new Date(); // or new Date(Date.now())
        const hh = String(d.getUTCHours()).padStart(2, '0');
        const mm = String(d.getUTCMinutes()).padStart(2, '0');
        await interaction.reply({content: `The current time in Gielinor is **${hh}:${mm}**`, ephemeral: interaction.options.getBoolean('Ephemeral')})
    }
}