let handler = async (m, { conn, usedPrefix, text, command }) => {
    conn.sendHydrated(m.chat, 
' *–––––––【 RULES 】–––––––*', 
`⮕ No 18+ content
⮕ Valor as main team allowed
⮕ No Off topic talks
⮕ No Flirting/Abuses
⮕ Don\'t change grp name/DP
⮕ Don\'t screw up admin
⮕ Respect each other and don\'t argue with anyone else because we are like a family
⮕ Any decision should be taken by consult of other fellow admins any one admin can\'t take any decision themselves
⮕ Breaking rule=Kickout without warning and admins getting demotion💣
⮕ Use mass tag once at the start of the raid and 2nd time after decided`, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`﹤ʙᴏᴛ ɪɴғᴏ`, `${usedPrefix}info`],
[`✓`, `${usedPrefix}ok`]
], m)
}
handler.help = ['rules']
handler.tags = ['info']
handler.command = /^(rules)$/i

export default handler