import React, { useState, useEffect, useRef } from 'react'

const usePolling = (config: any) => {
  let { url, interval = 2000, onSuccess, onFailure = () => {}, ...api } = config

  const [isPolling, togglePolling] = useState(false)

  const persistedIsPolling = useRef<boolean>()
  const isMounted = useRef<boolean>()
  const poll = useRef<any>()

  persistedIsPolling.current = isPolling

  useEffect(() => {
    isMounted.current = true
    startPolling()
    return () => {
      isMounted.current = false
      stopPolling()
    }
  }, [])

  const stopPolling = () => {
    if (isMounted.current) {
      if (poll.current) {
        clearTimeout(poll.current)
        poll.current = null
      }

      togglePolling(false)
    }
  }

  const startPolling = () => {
    togglePolling(true)
    runPolling()
  }

  const runPolling = () => {
    const timeoutId = setTimeout(() => {
      fetch(url, api)
        .then((resp) => {
          return resp.json().then((data) => {
            if (resp.ok) {
              return data
            } else {
              return Promise.reject({ status: resp.status, data })
            }
          })
        })
        .then(onSuccess)
        .then((continuePolling) => {
          persistedIsPolling.current && continuePolling
            ? runPolling()
            : stopPolling()
        })
        .catch((error) => {
          onFailure && onFailure(error)
          stopPolling()
        })
    }, interval)

    poll.current = timeoutId
  }

  return [isPolling, startPolling, stopPolling]
}

export default usePolling
