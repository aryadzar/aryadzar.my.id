export function generateSlug(title: string, id: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Hapus simbol
      .replace(/\s+/g, '-') // Spasi jadi "-"
      + '-' + id // Tambahkan id
  )
}

export function extractIdFromSlug(slug: string): string {
  const parts = slug.split('-')
  return parts[parts.length - 1] // ID ada di ujung
}
