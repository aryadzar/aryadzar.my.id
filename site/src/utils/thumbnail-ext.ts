export function extractFirstImage(html: string): string | null {
    const youtubeMatch = html.match(/<iframe[^>]+src="https:\/\/www\.youtube\.com\/embed\/([^"?&]+)"/);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  
    // Cek gambar pertama
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
      return imgMatch[1];
    }
  
    return null;
  }