import { load } from 'cheerio'

export default function preprocessHtmlWithZoomWrapper(html: string): string {
  const $ = load(html)

  // Gambar di dalam <a>
  $('a:has(img)').each((_, a) => {
    const $a = $(a)
    const $img = $a.find('img').first()
    const href = $a.attr('href')
    const src = $img.attr('src') || href

    if (src && href) {
      $a.replaceWith(`<zoom-wrapper data-src="${href}" data-thumb="${src}"></zoom-wrapper>`)
    }
  })

  // Gambar standalone
  $('img').each((_, img) => {
    const $img = $(img)
    const src = $img.attr('src')
    if (src && !$img.parents('a').length) {
      $img.replaceWith(`<zoom-wrapper data-src="${src}" data-thumb="${src}"></zoom-wrapper>`)
    }
  })

  return $.html()
}
