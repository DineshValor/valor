const items = {
    buy: {
        limit: {
            exp: 999
        },
        potion: {
            money: 499,
        },
        trash: {
            money: 99,
        }
    },
    sell: {
        potion: {
            money: 249,
        },
        trash: {
            money: 49
        }
    }
}

let handler = async (m, { command, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender]
    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    const info = `
🌀 ${command} ɪᴛᴇᴍs ﹫ ᴄᴏsᴛ :
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `⮕ 1 ${global.rpg.emoticon(v)} ${v} @ ${listItems[v][paymentMethod]} ${global.rpg.emoticon(paymentMethod)} ${paymentMethod}`.trim()
    }).join('\n')}
––––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴄᴏᴍᴍᴀɴᴅ: 
${usedPrefix}${command} [item] [quantity]
★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}${command} potion 10
`.trim()
    const item = (args[0] || '').toLowerCase()
    const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (!listItems[item]) return conn.sendHydrated(m.chat, 
    ' *––––––––【 SHOP 】––––––––*', 
    info, null, null, null, null, null, [
['      ﹤ᴍᴇɴᴜ      ', '/menu'],
[`ʙᴜʏ ᴩᴏᴛɪᴏɴ`, `${usedPrefix}buy potion`],
[`sᴇʟʟ ᴩᴏᴛɪᴏɴ`, `${usedPrefix}sell potion`]
], m)
    if (command.toLowerCase() == 'buy') {
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) return conn.sendHydrated(m.chat,
`*–––––––【 SHOP 】–––––––*`,
`          • ɪɴsᴜғғɪᴄɪᴇɴᴛ ʙᴀʟᴀɴᴄᴇ •
Need ${(listItems[item][paymentMethod] * total) - user[paymentMethod]} ${global.rpg.emoticon(paymentMethod)}${paymentMethod} to buy ${total} ${global.rpg.emoticon(item)}${item}.
––––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴄᴏʟʟᴇᴄᴛ ᴍᴏɴᴇʏ|ᴇxᴩ|ɪᴛᴇᴍ|ᴄʀᴀᴛᴇ:
${usedPrefix}open [crate] [quantity]
★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}open mythic 3`, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`],
[`ᴏᴩᴇɴ ᴄʀᴀᴛᴇ`, `${usedPrefix}open`]
], m)
        user[paymentMethod] -= listItems[item][paymentMethod] * total
        user[item] += total
        return conn.sendHydrated(m.chat, 
' *–––––––【 SHOP 】–––––––*', 
`You bought ${total} ${global.rpg.emoticon(item)}${item}`, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ᴀᴅᴠᴇɴᴛᴜʀᴇ`, `${usedPrefix}adventure`],
[`✓`, `${usedPrefix}ok`]
], m)
    } else {
        if (user[item] < total) return conn.sendHydrated(m.chat, 
' *–––––––【 SHOP 】–––––––*', 
`          • ɪɴsᴜғғɪᴄɪᴇɴᴛ ʙᴀʟᴀɴᴄᴇ •
You have ${user[item]} ${global.rpg.emoticon(item)}${item} in bag to sell.
––––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴄᴏʟʟᴇᴄᴛ ᴍᴏɴᴇʏ|ᴇxᴩ|ɪᴛᴇᴍ|ᴄʀᴀᴛᴇ:
${usedPrefix}open [crate] [quantity]
★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}open mythic 3`, null, null, null, null, null, [
['      ﹤ᴍᴇɴᴜ      ', '/menu'],
[`﹤ɪɴᴠᴇɴᴛᴏʀʏ`, `${usedPrefix}inventory`],
[`ᴏᴩᴇɴ ᴄʀᴀᴛᴇ`, `${usedPrefix}open`]
], m)
        user[item] -= total
        user.money += listItems[item].money * total
        return conn.sendHydrated(m.chat, 
    ' *–––––––【 SHOP 】–––––––*', 
    `You sold ${total} ${global.rpg.emoticon(item)}${item}`, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[``, `${usedPrefix}`],
[``, `${usedPrefix}`]
], m)
    }
}

handler.help = ['buy', 'sell'].map(v => v + ' [item] [count]')
handler.tags = ['rpg']
handler.command = /^(buy|sell)$/i

handler.disabled = false

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}