// utils/heading-helper.server.ts
import { load } from 'cheerio'

/** Tambahkan ID ke semua heading h1-h6 */
export function addIdsToHeadings(html: string): string {
  const $ = load(html)

  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const $el = $(el)
    const id = $el.text().toLowerCase().trim()
      .replace(/\s+/g, '-')              // ganti spasi dengan "-"
      .replace(/[^\w\-]+/g, '')          // hapus simbol aneh
    if (id) $el.attr('id', id)
  })

  return $.html()
}

/** Ambil semua heading dan buat daftar TOC */
export function extractHeadingsFromHtml(html: string) {
  const $ = load(html)
  const headings: { id: string; text: string; level: number }[] = []

  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const $el = $(el)
    const text = $el.text().trim()
    const id = text.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
    const level = Number(el.tagName[1])

    headings.push({ id, text, level })
  })

  return headings
}
