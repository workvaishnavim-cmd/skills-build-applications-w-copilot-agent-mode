import { useEffect, useState } from 'react'
import { apiBaseUrl, getRecords } from '../api.js'

export function useCollection(endpoint, fetcher = fetch) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')

      try {
        const response = await fetcher(`${apiBaseUrl}${endpoint}`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        setRecords(getRecords(await response.json()))
      } catch (requestError) {
        if (!(requestError instanceof Error && requestError.name === 'AbortError')) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Unable to load data.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint, fetcher])

  return { records, loading, error }
}
