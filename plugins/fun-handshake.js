let toM = a => '@' + a.split('@')[0]
function handler(m, { usedPrefix, groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let b
    do b = ps.getRandom()
    while (b === a)
    conn.sendHydrated(m.chat,
`  *–––––【 HANDSHAKE 】–––––*`,
`${toM(a)}🤝🏻${toM(b)}`, null, null, null, null, null, [
[`      ﹤ᴍᴇɴᴜ      `, `${usedPrefix}menu`],
[`🤝🏻 ᴀɢᴀɪɴ`, `${usedPrefix}handshake`],
[``, ``]
], m, {
        mentions: [a, b]
    })
}
handler.help = ['handshake / hs']
handler.tags = ['main', 'fun']
handler.command = ['handshake', 'hs']

handler.group = true

export default handler