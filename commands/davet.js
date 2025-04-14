const { Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const config = require("../config.json");  

module.exports = {
  name: "davet",
  description: "KUBMUS #BAŞLIYORUZ Sunucusuna Aitim Davet Edemezsin.",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    const dvt = new ButtonBuilder()
      .setLabel('Davet Linkim')
      .setStyle('Link')
      .setEmoji('🤖')
      .setURL(config["bot-davet"]);

    const destek = new ButtonBuilder()
      .setLabel('Destek Talebi')
      .setStyle('Link')
      .setEmoji('🌎')
      .setURL(config["desteksunucusu"]);

    const row = new ActionRowBuilder().addComponents(dvt, destek);

    const embed = new EmbedBuilder()
      .setAuthor({ name: `Merhaba, Ben ${config["bot-adi"]}!`, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true })})
      .setTitle(`${config["bot-adi"]}' KUBMUS #BAŞLIYORUZ!`)
      .setDescription(`🤖 | KUBMUS #BAŞLIYORUZ Sunucusuna Aitim Davet Edemezsin... `)
      .setImage("https://hizliresim.com/o8vsi4s")
      .setColor('#2F3136')
      .setTimestamp()
      .setFooter({ text: `${interaction.user.tag} İstedi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

    interaction.reply({ embeds: [embed], components: [row] });
  }  
};