export function extractFirstImage(html: string): string | null {
    const youtubeMatch = html.match(/<iframe[^>]+src="https:\/\/www\.youtube\.com\/embed\/([^"?&]+)"/);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    // Cek zoom-wrapper (dari preprocessing)
  const zoomMatch = html.match(/<zoom-wrapper[^>]+data-src="([^">]+)"/);
  if (zoomMatch) {
    return zoomMatch[1];
  }
    // Cek gambar pertama
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
      return imgMatch[1];
    }
  
    return null;
  }