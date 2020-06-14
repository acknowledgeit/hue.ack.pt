import React, { useEffect, useRef } from 'react'

const useDeferredEffect = (func: any, deps: any) => {
  const deferred = useRef(true)

  useEffect(() => {
    if (deferred.current) {
      deferred.current = false
    } else {
      func()
    }
  }, deps)
}

export default useDeferredEffect
