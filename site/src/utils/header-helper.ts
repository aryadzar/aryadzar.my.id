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
