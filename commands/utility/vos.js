const path = require('node:path');
const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, MediaGalleryBuilder, TextDisplayBuilder, MessageFlags} = require('discord.js');
const {createWeirdgloopVosClient} = require("../../api/weirdgloop/vos");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vos')
        .setDescription('Displays the current Voice of Seren in Prifddinas.')
        .addBooleanOption(option => option.setName('ephemeral').setDescription('Should this message be viewable only by you?')),
    async execute(interaction) {
        const vos = await createWeirdgloopVosClient().getVos();
        const ephemeral = interaction.options.getBoolean('ephemeral') ?? false;

        const files = [];
        let district1AttachmentName = null;
        let district2AttachmentName = null;

        if (vos.district1image) {
            const filePath = path.join(process.cwd(), 'assets', 'images', 'vos', vos.district1image);
            files.push(new AttachmentBuilder(filePath).setName(vos.district1image));
            district1AttachmentName = vos.district1image;
        }

        if (vos.district2image) {
            const filePath = path.join(process.cwd(), 'assets', 'images', 'vos', vos.district2image);
            files.push(new AttachmentBuilder(filePath).setName(vos.district2image));
            district2AttachmentName = vos.district2image;
        }

        const embed = new EmbedBuilder()
            .setTitle('Voice of Seren (Prifddinas)')
            .setColor(0x7fdbff)
            .addFields(
                { name: 'District 1', value: vos.district1, inline: true },
                { name: 'District 2', value: vos.district2, inline: true },
                { name: 'Last Updated', value: `<t:${Math.floor(Date.parse(vos.timestamp) / 1000)}:R>`, inline: false },
            );

        // Embed only supports one main image; use district1 as the main image, district2 as thumbnail (optional).
        // if (district1AttachmentName) embed.setImage(`attachment://${district1AttachmentName}`);
        // if (district2AttachmentName) embed.setThumbnail(`attachment://${district2AttachmentName}`);

        await interaction.reply({
            embeds: [embed],
            //files,
            ephemeral,
        });
    },
};