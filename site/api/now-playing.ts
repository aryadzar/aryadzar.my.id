export default async function handler(req: Request): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch('https://now-play.vercel.app/api/generate?uid=d7db6b1a-c866-430d-872f-f6236a927ad2', {
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) {
      return new Response("Failed to fetch data", { status: res.status })
    }

    const svg = await res.text()

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 's-maxage=60, stale-while-revalidate',
      },
    })
  } catch (error) {
    return new Response("Error fetching data or timeout", { status: 500 })
  }
}
