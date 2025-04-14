const Discord = require("discord.js");
const db = require("croxydb");
const config = require("../config.json"); 

module.exports = {
    name: "guildMemberRemove",
    run: async (client, member) => {
        try {

            // HG/BB sistemi
            const hgbb1 = db.fetch(`hgbb1_${member.guild.id}`);
            const sayacmessage = db.fetch(`sayacmessage_${member.guild.id}`);
            if (hgbb1) {
                const kanal = member.guild.channels.cache.find(c => c.id === hgbb1.channel);
                if (sayacmessage) {
                    const cikismesaj = sayacmessage.leaveMsg
                        .replace("{guild.memberCount}", `${member.guild.memberCount}`)
                        .replace("{guild.name}", `${member.guild.name}`)
                        .replace("{owner.name}", `<@${member.guild.ownerId}>`)
                        .replace("{member}", `<@${member.user.id}>`);
                    const cikismesajs = new Discord.EmbedBuilder()
                        .setDescription(`${cikismesaj}`);
                    try {
                        kanal.send({ embeds: [cikismesajs] });
                    } catch (err) { }
                } else {
                    const normalmesaj = new Discord.EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('Görüşürüz')
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
                        .setURL(`${config["website"]}`)
                        .setDescription(`📤 | ${member} Sunucudan ayrıldı.\n Sunucumuz **${member.guild.memberCount}** kişi kaldı!`)
                        .setImage('https://hizliresim.com/o8vsi4s')
                        .setTimestamp();
                    try {
                        kanal.send({ embeds: [normalmesaj] });
                    } catch (err) {
                        console.error("Normal mesaj gönderirken bir hata oluştu.");
                        }
                }
            }
        } catch (err) {
            console.error("Bir hata oluştu:", err);
        }
    }
};
