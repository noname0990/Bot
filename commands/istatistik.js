const { Client, EmbedBuilder } = require("discord.js");
const Discord = require('discord.js')
const moment = require("moment");
const db = require("croxydb")
require("moment-duration-format");
const os = require("os");
const config = require("../config.json"); 
const botsahip = `<@${config["sahip"]}>`;
const website = `${config["website"]}`;


module.exports = {
  name: "istatistik",
  description: " Botun istatistiğini görürsün!",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    const Uptime = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
	    const row = new Discord.ActionRowBuilder()
    .addComponents(
new Discord.ButtonBuilder()
.setLabel("Yenile")
.setStyle(Discord.ButtonStyle.Primary)
.setEmoji('1039607071093567658')
.setCustomId("yenile_"+interaction.user.id))
.addComponents(
  new Discord.ButtonBuilder()
      .setEmoji("1039607063443161158")
      .setLabel(" ")
      .setStyle(Discord.ButtonStyle.Danger)
      .setCustomId("clearMessageButton_"+interaction.user.id)
)
let zaman = db.get(`botAcilis_`)
let date = `<t:${Math.floor(zaman / 1000)}:R>`
let servers = client.guilds.cache.size
let members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)




    const embed = new EmbedBuilder()
    .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
    .addFields(
      { name: '</> Bot Sahibi', value: `${botsahip}`, inline: true },
      { name: "👥 Kullanıcılar", value: `${members}`, inline: true },
      { name: '🌐 Websitesi', value: `${website}`, inline: true },
      { name: "🧩 Sunucular", value: `${servers}`, inline: true },
      { name: "📼 Bellek Kullanımı", value: `${(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2)}MB`, inline: true },
      { name: "⏳ Açılma Süresi", value: `${date}`, inline: true },
      { name: "⏺️ Ping", value: `${client.ws.ping}`, inline: true },
    )
    .setImage("https://hizliresim.com/o8vsi4s")
    interaction.reply({embeds: [embed], components: [row]})
   
  }

};
