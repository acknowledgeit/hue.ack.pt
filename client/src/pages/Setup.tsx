import React, { FunctionComponent, useEffect, useState } from 'react'

import Bridge from '../components/Bridge'
import Config from '../shared/config'

interface SetupProps {
  cache: any
  setCache: any
}

const Setup: FunctionComponent<SetupProps> = ({ cache, setCache }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [bridges, setBridges] = useState<Bridge[]>([])

  useEffect(() => {
    if (!!cache) {
      setBridges(cache.bridges)
      setIsLoading(false)
    } else {
      const fetchData = async () => {
        try {
          let response = await fetch(Config.HUE_DISCOVERY_ENDPOINT)
          let bridgesJSON = (await response.json()) as Array<Bridge>

          // expand with details for each bridge
          let bridgesDetails = await Promise.all(
            bridgesJSON.map(async (bridgeInfo: Bridge) => {
              const configURL = `https://${bridgeInfo.internalipaddress}/api/config`
              let response = await fetch(configURL)
              let bridgeConfig = (await response.json()) as Bridge

              return {
                ...bridgeInfo,
                ...bridgeConfig,
              }
            })
          )

          setBridges(bridgesDetails)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [])

  return (
    <>
      {isLoading && (
        <p className="muted">
          Looking for Hue bridges available in your network...
        </p>
      )}

      {bridges.map((bridge, index) => (
        <Bridge key={index} bridge={bridge} />
      ))}
    </>
  )
}

export default Setup
