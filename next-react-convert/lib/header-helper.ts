/** Helper: Tambahkan ID ke H1-H3 */
export function addIdsToHeadings(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6")

  headings.forEach(el => {
    const id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    if (id) el.id = id
  })

  return doc.body.innerHTML
}

/** Helper: Ekstrak daftar heading */
export function extractHeadingsFromHtml(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const headings = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"))
  return headings.map((el) => ({
    id: el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') || '',
    text: el.textContent || '',
    level: Number(el.tagName[1]),
  }))
}

export function enhanceLinks(html: string) {
  return html.replace(
    /<a\b([^>]*)>/gi,
    `<a $1 class="text-violet-400 hover:text-violet-500 transition-colors underline underline-offset-2">`
  );
}

export function decodeHtmlEntities(str: string) {
  const doc = new DOMParser().parseFromString(str, "text/html")
  return doc.documentElement.textContent || ""
}