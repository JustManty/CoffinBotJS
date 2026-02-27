const { SlashCommandBuilder } = require('discord.js');
const { hiscores } = require('runescape-api');
const { rule, titleLine, row } = require('../../utility/util.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skills')
        .setDescription('Displays the skill information for a given player.')
        .addStringOption(option => option.setName('player').setDescription('The player to lookup skill information for.').setRequired(true))
        .addBooleanOption(option => option.setName('ephemeral').setDescription('Should this message be viewable only by you?')),
    async execute(interaction) {
        const playerName = interaction.options.getString('player');
        const ephemeral = interaction.options.getBoolean('ephemeral');

        try {
            const player = await hiscores.getPlayer(playerName);

            const WIDTHS = [15, 7, 12, 9];

            let table = rule(WIDTHS, '+', '=', '+', '=');
            table += '\n' + titleLine(playerName, WIDTHS);
            table += '\n' + titleLine('SKILL INFORMATION', WIDTHS);
            table += '\n' + rule(WIDTHS);
            table += '\n' + row(['Skill', 'Level', 'XP', 'Rank'], WIDTHS, ['center', 'center', 'center', 'center']);
            table += '\n' + rule(WIDTHS);
            table += '\n' + row(['Overall', String(player.skills.overall.level), String(player.skills.overall.experience), String(player.skills.overall.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Agility', String(player.skills.agility.level), String(player.skills.agility.experience), String(player.skills.agility.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Archaeology', String(player.skills.archaeology.level), String(player.skills.archaeology.experience), String(player.skills.archaeology.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Attack', String(player.skills.attack.level), String(player.skills.attack.experience), String(player.skills.attack.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Constitution', String(player.skills.constitution.level), String(player.skills.constitution.experience), String(player.skills.constitution.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Construction', String(player.skills.construction.level), String(player.skills.construction.experience), String(player.skills.construction.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Cooking', String(player.skills.cooking.level), String(player.skills.cooking.experience), String(player.skills.cooking.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Crafting', String(player.skills.crafting.level), String(player.skills.crafting.experience), String(player.skills.crafting.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Defence', String(player.skills.defence.level), String(player.skills.defence.experience), String(player.skills.defence.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Divination', String(player.skills.divination.level), String(player.skills.divination.experience), String(player.skills.divination.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Dungeoneering', String(player.skills.dungeoneering.level), String(player.skills.dungeoneering.experience), String(player.skills.dungeoneering.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Farming', String(player.skills.farming.level), String(player.skills.farming.experience), String(player.skills.farming.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Firemaking', String(player.skills.firemaking.level), String(player.skills.firemaking.experience), String(player.skills.firemaking.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Fishing', String(player.skills.fishing.level), String(player.skills.fishing.experience), String(player.skills.fishing.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Fletching', String(player.skills.fletching.level), String(player.skills.fletching.experience), String(player.skills.fletching.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Herblore', String(player.skills.herblore.level), String(player.skills.herblore.experience), String(player.skills.herblore.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Hunter', String(player.skills.hunter.level), String(player.skills.hunter.experience), String(player.skills.hunter.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Invention', String(player.skills.invention.level), String(player.skills.invention.experience), String(player.skills.invention.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Magic', String(player.skills.magic.level), String(player.skills.magic.experience), String(player.skills.magic.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Mining', String(player.skills.mining.level), String(player.skills.mining.experience), String(player.skills.mining.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Necromancy', String(player.skills.necromancy.level), String(player.skills.necromancy.experience), String(player.skills.necromancy.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Prayer', String(player.skills.prayer.level), String(player.skills.prayer.experience), String(player.skills.prayer.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Ranged', String(player.skills.ranged.level), String(player.skills.ranged.experience), String(player.skills.ranged.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Runecrafting', String(player.skills.runecrafting.level), String(player.skills.runecrafting.experience), String(player.skills.runecrafting.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Slayer', String(player.skills.slayer.level), String(player.skills.slayer.experience), String(player.skills.slayer.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Smithing', String(player.skills.smithing.level), String(player.skills.smithing.experience), String(player.skills.smithing.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Strength', String(player.skills.strength.level), String(player.skills.strength.experience), String(player.skills.strength.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Summoning', String(player.skills.summoning.level), String(player.skills.summoning.experience), String(player.skills.summoning.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Thieving', String(player.skills.thieving.level), String(player.skills.thieving.experience), String(player.skills.thieving.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + row(['Woodcutting', String(player.skills.woodcutting.level), String(player.skills.woodcutting.experience), String(player.skills.woodcutting.rank)], WIDTHS, ['center', 'right', 'right', 'right']);
            table += '\n' + rule(WIDTHS, '+', '=', '+', '=');

            await interaction.reply({
                content: ('```' + table + '```'),
                flags: ephemeral ? MessageFlags.Ephemeral : 0});
        } catch (error) {
            console.error('Error fetching player data:', error);
            await interaction.reply({
                content: `Could not fetch player data for **${playerName}**.`,
                flags: ephemeral ? MessageFlags.Ephemeral : 0});
        }
    }
}