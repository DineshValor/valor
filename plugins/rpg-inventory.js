import daily from './rpg-daily.js'
import monthly from './rpg-monthly.js'
import adventure from './rpg-adventure.js'
import { join } from 'path'
import { promises } from 'fs'

const inventory = {
  others: {
    health: true,
    money: true,
    exp: true,
  },
  items: {
    potion: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    emerald: true,
    diamond: true,
    gold: true,
    iron: true,
  },
  tools: {
    armor: {
      '0': '❌',
      '1': 'Leather Armor',
      '2': 'Iron Armor',
      '3': 'Gold Armor',
      '4': 'Diamond Armor',
      '5': 'Emerald Armor',
      '6': 'Crystal Armor',
      '7': 'Obsidian Armor',
      '8': 'Netherite Armor',
      '9': 'Wither Armor',
      '10': 'Dragon Armor',
      '11': 'Hacker Armor'
    },
    sword: {
      '0': '❌',
      '1': 'Wooden Sword',
      '2': 'Stone Sword',
      '3': 'Iron Sword',
      '4': 'Gold Sword',
      '5': 'Copper Sword',
      '6': 'Diamond Sword',
      '7': 'Emerald Sword',
      '8': 'Obsidian Sword',
      '9': 'Netherite Sword',
      '10': 'Samurai Slayer Green Sword',
      '11': 'Hacker Sword'
    },
    pickaxe: {
      '0': '❌',
      '1': 'Wooden Pickaxe',
      '2': 'Stone Pickaxe',
      '3': 'Iron Pickaxe',
      '4': 'Gold Pickaxe',
      '5': 'Copper Pickaxe',
      '6': 'Diamond Pickaxe',
      '7': 'Emerlad Pickaxe',
      '8': 'Crystal Pickaxe',
      '9': 'Obsidian Pickaxe',
      '10': 'Netherite Pickaxe',
      '11': 'Hacker Pickaxe'
    },
    fishingrod: true,

  },
  crates: {
    common: true,
    uncommon: true,
    mythic: true,
    legendary: true,
    pet: true,
  },
  pets: {
    horse: 10,
    cat: 10,
    fox: 10,
    dog: 10,
  },
  cooldowns: {
    lastclaim: {
      name: 'daily',
      time: daily.cooldown
    },
    lastmonthly: {
      name: 'monthly',
      time: monthly.cooldown
    },
    lastadventure: {
      name: 'adventure',
      time: adventure.cooldown
    }
  }
}
let handler = async (m, { conn, usedPrefix, __dirname}) => {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
  let user = global.db.data.users[m.sender]
  const tools = Object.keys(inventory.tools).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${typeof inventory.tools[v] === 'object' ? inventory.tools[v][user[v]?.toString()] : `Level(s) ${user[v]}`}`).filter(v => v).join('\n').trim()
  const items = Object.keys(inventory.items).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n').trim()
  const crates = Object.keys(inventory.crates).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n').trim()
  const pets = Object.keys(inventory.pets).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v] >= inventory.pets[v] ? 'Max Levels' : `Level(s) ${user[v]}`}`).filter(v => v).join('\n').trim()
  const cooldowns = Object.entries(inventory.cooldowns).map(([cd, { name, time }]) => cd in user && `⮕ ⌛ ${name}: ${new Date() - user[cd] >= time ? `❎` : `✅`}`).filter(v => v).join('\n').trim()
  const caption = `
${Object.keys(inventory.others).map(v => user[v] && `${global.rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join('\n')}${tools ? `
🌀 ᴛᴏᴏʟs :
${tools}` : ''}${items ? `

🌀 ɪᴛᴇᴍs :
${items}
⮕ 🎒 Total Items: ${Object.keys(inventory.items).map(v => user[v]).reduce((a, b) => a + b, 0)} Items` : ''}${crates ? `

🌀 ᴄʀᴀᴛᴇs :
${crates}
⮕ 🎒 Total Crates: ${Object.keys(inventory.crates).map(v => user[v]).reduce((a, b) => a + b, 0)} Crates` : ''}${pets ? `

🌀 ᴩᴇᴛs :
${pets}` : ''}${cooldowns ? `

♻️ ᴄᴏʟʟᴇᴄᴛ :
${cooldowns}` : ''}
––––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ɢᴇᴛ ᴍᴏʀᴇ ʀᴇᴡᴀʀᴅs:
${usedPrefix}open [crate] [quantity]
★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}open mythic 3
⮕ ᴛʀᴀɴsғᴇʀ ᴍᴏɴᴇʏ|ɪᴛᴇᴍ|ᴄʀᴀᴛᴇ:
${usedPrefix}transfer [money|item|crate] [quantity] @user
★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}transfer trash 10 @${_package.name}
`.trim()
conn.sendHydrated(m.chat, '  *–––––【 INVENTORY 】–––––*', caption, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ᴩʀᴏғɪʟᴇ`, `${usedPrefix}profile`],
[`ᴀᴅᴠᴇɴᴛᴜʀᴇ`, `${usedPrefix}adventure`]
], m)
}
handler.help = ['inventory', 'inv']
handler.tags = ['rpg']
handler.command = /^(inv(entory)?|bal(ance)?|money|e?xp)$/i
export default handler
