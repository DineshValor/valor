const rewards = {
  exp: 999,
  money: 499,
  potion: 5,
}
const cooldown = 86400000
let handler = async (m, { usedPrefix }) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastclaim < cooldown) return conn.sendHydrated(m.chat,
`*––––––––【 DAILY 】––––––––*`,
`You have already claimed daily reward!
Wait ⏱️ ${((user.lastclaim + cooldown) - new Date()).toTimeString()}`, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`],
[`ᴍᴏɴᴛʜʟʏ`, `${usedPrefix}monthly`]
], m)
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `⮕ ${global.rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`
  }
  conn.sendHydrated(m.chat,
`*––––––––【 DAILY 】––––––––*`,
`🌀 ᴅᴀɪʟʏ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :
${text}`.trim(), null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`],
[`ᴍᴏɴᴛʜʟʏ`, `${usedPrefix}monthly`]
], m)
  user.lastclaim = new Date * 1
}
handler.help = ['daily', 'claim']
handler.tags = ['xp']
handler.command = /^(daily|claim)$/i

handler.cooldown = cooldown

export default handler
