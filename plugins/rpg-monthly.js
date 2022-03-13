const rewards = {
    exp: 10000,
    money: 4999,
    potion: 10,
    mythic: 3,
    legendary: 1
}

const cooldown = 2592000000
let handler = async (m, {usedPrefix}) => {
    let user = global.db.data.users[m.sender]
    if (new Date - user.lastmonthly < cooldown) return conn.sendHydrated(m.chat,
` *––––––【 MONTHLY 】––––––*`,
`You have already claimed monthly reward!
Wait ⏱️ ${((user.lastmonthly + cooldown) - new Date()).toTimeString()}`, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`],
[`ᴀᴅᴠᴇɴᴛᴜʀᴇ`, `${usedPrefix}adventure`]
], m)
    let text = ''
    for (let reward of Object.keys(rewards)) if (reward in user) {
        user[reward] += rewards[reward]
        text += `⮕ ${rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`
    }
    conn.sendHydrated(m.chat,
` *––––––【 MONTHLY 】––––––*`,
`🌀 ᴍᴏɴᴛʜʟʏ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :
${text}`.trim(), null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`],
[`ᴀᴅᴠᴇɴᴛᴜʀᴇ`, `${usedPrefix}adventure`]
], m)
    user.lastmonthly = new Date * 1
}
handler.help = ['monthly']
handler.tags = ['rpg']
handler.command = /^(monthly)$/i

handler.cooldown = cooldown

export default handler

