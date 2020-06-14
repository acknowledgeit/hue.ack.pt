export const LumenCache = {
  getUsernameForBridge: (bridgeId: string) => {
    return window.localStorage.getItem(`${bridgeId}_username`)
  },
  getCachedState: () => {
    let cache = window.localStorage.getItem('_cache')

    if (cache) return JSON.parse(cache)

    return null
  },
  setCachedState: (state: any) => {
    let cache = JSON.stringify(state)
    window.localStorage.setItem('_cache', cache)
  },
}

export default LumenCache
