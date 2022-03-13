import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
let handler = async (m, { conn,usedPrefix, usedPrefix: _p, text, command }) => {
    let date = moment.tz('Asia/Kolkata').format("dddd, Do MMMM, YYYY")
    let time = moment.tz('Asia/Kolkata').format('HH:mm:ss')
    let name = await conn.getName(m.sender)
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    conn.sendHydrated(m.chat, 
    '*–––––––【 PROFILE 】–––––––*', 
`🧑🏻‍🏫 ɴᴀᴍᴇ: ${name}
🎳 ʟɪᴍɪᴛ: ${limit}
🎗️ ʀᴏʟᴇ: ${role}
🎖️ ʟᴇᴠᴇʟ: ${level} ﹙${exp - min} / ${xp}﹚
☕ ᴛᴏᴛᴀʟ xᴩ: ${exp}
〽️ ᴩʀᴇғɪx: ${_p}

📅 ᴅᴀᴛᴇ: ${date}
⌚ ᴛɪᴍᴇ: ${time} ﹙ɢᴍᴛ +5:30﹚`, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ`, `${usedPrefix}leaderboard`],
[`ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`]
], m)
}

handler.help = ['profile']
handler.tags = ['info']
handler.command = /^(profile)$/i

export default handler