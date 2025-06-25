import { useEffect, useState } from "react"
import axios from "axios"

const SHEET_ID = `${process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID}`
const API_KEY = `${process.env.NEXT_PUBLIC_API_BLOG_KEY}`

export function useGoogleSheetData(sheetName: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`
        )
        const rows = res.data.values
        const headers = rows[0]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const items = rows.slice(1).map((row: any[]) =>
          Object.fromEntries(headers.map((h: string, i: number) => [h, row[i]]))
        )
        setData(items)
      } catch (error) {
        console.error("Failed to fetch Google Sheets data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [sheetName])

  return { data, loading }
}
