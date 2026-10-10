const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const browserCodespaceName =
  typeof window === 'undefined'
    ? undefined
    : window.location.hostname.match(/^(.+)-5173\.app\.github\.dev$/)?.[1]
const codespaceName = configuredCodespaceName || browserCodespaceName

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items', 'records', 'data']) {
      if (key in payload) {
        return getRecords(payload[key])
      }
    }
  }

  throw new Error('The API response did not contain a list of records.')
}
