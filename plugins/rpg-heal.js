let handler = async (m, { args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    if (user.health >= 100) return conn.sendHydrated(m.chat,
`*–––––––【 HEAL 】–––––––*`,
`Your ❤️ Health is full!`.trim(), null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ᴀᴅᴠᴇɴᴛᴜʀᴇ`, `${usedPrefix}adventure`],
[`✓`, `${usedPrefix}ok`]
], m)
    const heal = 40 + (user.cat * 4)
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)))) * 1
    if (user.potion < count) return conn.sendHydrated(m.chat,
` *––––––––【 HEAL 】––––––––*`, 
`          • ɪɴsᴜғғɪᴄɪᴇɴᴛ ᴩᴏᴛɪᴏɴ(s) •
You have ${user.potion} 🥤Potion in bag.
You need to buy ${count - user.potion} more 🥤Potion to heal.
`, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`],
[`ʙᴜʏ ᴩᴏᴛɪᴏɴ`, `${usedPrefix}buy potion ${count - user.potion}`]
], m)
    user.potion -= count * 1
    user.health += heal * count
    conn.sendHydrated(m.chat, 
    ` *––––––––【 HEAL 】––––––––*`, 
`Successful use of ${count} 🥤Potion(s)
`.trim(), null, null, null, null, null, [
['      ﹤ᴍᴇɴᴜ      ', '/menu'],
[`﹤ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`],
[`ᴀᴅᴠᴇɴᴛᴜʀᴇ`, `${usedPrefix}adventure`]
], m)
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal)$/i

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}