import { format } from 'util'
const { default: { Image } } = await import('node-webpmux')

let handler = async (m, { usedPrefix, command }) => {
    if (!m.quoted) return m.reply(`Tag sticker with command *_"${usedPrefix + command}"_*`)
    if (/sticker/.test(m.quoted.mtype)) {
        let img = new Image()
        await img.load(await m.quoted.download())
        m.reply(format(JSON.parse(img.exif.slice(22).toString())))
    }
}
handler.help = ['stickerinfo (tag sticker)']
handler.tags = ['Sticker']

handler.command = /^(sinfo|stickerinfo)$/i

export default handler