import { useEffect, useState } from "react"
import axios from "axios"

const SHEET_ID = `${import.meta.env.VITE_GOOGLE_SHEET_ID}`
const API_KEY = `${import.meta.env.VITE_API_BLOG_KEY}`

export function useGoogleSheetData(sheetName: string) {
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
