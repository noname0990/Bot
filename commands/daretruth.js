const { Client, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "dogrulukcesaret",
    description: "Doğruluk Cesaret Oyunu Başlatır.",
    type: 1,
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return interaction.reply({ content: "❌ | Bu komutu kullanma yetkiniz yok!", ephemeral: true });
        }

        const startEmbed = new EmbedBuilder()
            .setTitle("🎉 Doğruluk Cesaret Oyunu 🎉")
            .setDescription("Oyun 10 Saniye İçinde Başlıyor...\n\nNasıl Oynanır?\n• Bu oyunu bilmeyen bence Discord'u kapatıp hava almaya çıksın.\n• Her neyse, katılımcılar aşağıdaki :bell: tepkisine tıklasın.\n\n**Not: Oyunun başlaması için en az iki oyuncu gereklidir.**")
            .setColor("Random")
            .setTimestamp();

        const startMessage = await interaction.reply({ embeds: [startEmbed], fetchReply: true });

        await startMessage.react('🔔');

        const filter = (reaction, user) => reaction.emoji.name === '🔔' && !user.bot;
        const collector = startMessage.createReactionCollector({ filter, time: 10000 });

        collector.on('end', async collected => {
            const players = collected.first().users.cache.filter(user => !user.bot);

            if (players.size < 2) {
                const notEnoughPlayersEmbed = new EmbedBuilder()
                    .setTitle("❌ Yetersiz Katılımcı")
                    .setDescription("Bu oyun en az 2 kişi ile oynanabilir.")
                    .setColor("Random")
                    .setTimestamp();
                return interaction.followUp({ embeds: [notEnoughPlayersEmbed] });
            }

            const playerIds = players.map(user => user.id);

            const spinningEmbed = new EmbedBuilder()
                .setTitle("Şişe Çevriliyor...")
                .setImage("https://hizliresim.com/o8vsi4s")
                .setColor("Random")
                .setTimestamp();
            await interaction.followUp({ embeds: [spinningEmbed] });

            setTimeout(async () => {
                const randomPlayerIndex = Math.floor(Math.random() * playerIds.length);
                const selectedPlayer = playerIds[randomPlayerIndex];

                db.set(`selectedPlayer_${interaction.guild.id}`, selectedPlayer);

                const truthOrDareEmbed = new EmbedBuilder()
                    .setTitle("Doğruluk mu Cesaret mi?")
                    .setDescription(`<@${selectedPlayer}>, seçimini yap!`)
                    .setColor("Random")
                    .setTimestamp();

                const truthButton = new ButtonBuilder()
                    .setCustomId('truth')
                    .setLabel('Doğruluk')
                    .setStyle(ButtonStyle.Primary);

                const dareButton = new ButtonBuilder()
                    .setCustomId('dare')
                    .setLabel('Cesaret')
                    .setStyle(ButtonStyle.Danger);

                const row = new ActionRowBuilder()
                    .addComponents(truthButton, dareButton);

                await interaction.followUp({ embeds: [truthOrDareEmbed], components: [row] });
            }, 10000);
        });
    }
};
