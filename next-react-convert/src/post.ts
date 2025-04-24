const postModules = import.meta.glob("../../blog/**/index.md", { eager: true })

export const posts = Object.entries(postModules).map(([path, mod]) => {
  // path contohnya: ../../blog/react-hooks/index.mdx
  const parts = path.split("/")
  const folderName = parts[parts.length - 2] // ✅ Aman & clean
  const slug = folderName
    .toLowerCase()
    .replace(/\s+/g, "-") // Ganti spasi dengan strip
    .replace(/[^a-z0-9-]/g, "") // Hapus karakter selain huruf, angka, dan strip

  const frontmatter = (mod as any).frontmatter || {}
  const frontmatterCategory = frontmatter.category

  const categories = Array.isArray(frontmatterCategory)
    ? frontmatterCategory
    : frontmatterCategory
      ? [frontmatterCategory]
      : []

  return {
    slug, // slug = folder name
    title: frontmatter.title || folderName,
    date: frontmatter.date || null,
    categories,
    component: (mod as any).default,
  }
})
