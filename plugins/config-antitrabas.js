export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {

if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1

let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[this.user.jid] || {}
let delet = m.key.participant
let bang = m.key.id
let name = await conn.getName(m.sender)

if (chat.antiTraba && m.text.length > 5000) { //Cantidad máxima de caracteres aceptados en un mensaje//
if (isAdmin) return conn.sendMessage(m.chat, { text: `🚩 *El administrador @${m.sender.split("@")[0]} acaba de enviar un texto que contiene muchos caracteres*`, mentions: [m.sender] }, { quoted: fkontak })
await conn.sendMessage(m.chat, `🚩 *Se detecto un mensaje que contiene muchos caracteres*\n`, `${isBotAdmin ? '' : 'No soy administrador, no puedo hacer nada :/'}`, m)
if (isBotAdmin && bot.restrict) {
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
setTimeout(() => { 
conn.sendMessage(m.chat, { text: `🎌 *Marcar el chat como leido*\n${"\n".repeat(400)}\n=> El número : wa.me/${m.sender.split("@")[0]}\n=> Alias : ${name}\nAcaba de enviar un texto que contiene muchos caracteres que puede ocasionar fallos en los dispositivos`, mentions: [m.sender] }, { quoted: fkontak })
}, 0)
setTimeout(() => { 
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}, 1000)
} else if (!bot.restrict) return m.reply(`*¡Esta característica está desactivada!*`)

}
return !0

}