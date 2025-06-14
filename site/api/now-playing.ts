export default async function handler(req: Request): Promise<Response> {
  const res = await fetch('https://now-play.vercel.app/api/generate?uid=d7db6b1a-c866-430d-872f-f6236a927ad2')

  const svg = await res.text()

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 's-maxage=60, stale-while-revalidate',
    },
  })
}
