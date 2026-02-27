const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('motto')
        .setDescription('Announces the clan motto'),
    async execute(interaction) {
        await interaction.reply('No skull, no skill!')
    }
}