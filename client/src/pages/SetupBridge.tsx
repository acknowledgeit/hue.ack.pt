import React, { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Bridge from '../components/Bridge'
import Halo from '../components/Halo'
import Config from '../shared/config'

interface SetupProps {
  cache: any
  setCache: any
}

const SetupBridge: FunctionComponent<SetupProps> = ({ cache, setCache }) => {
  const { bridgeId } = useParams()
  const [isSetup, setIsSetup] = useState(false)

  const bridge = cache.bridges.find((b: any) => b.id == bridgeId)

  useEffect(() => {
    ;(async () => {
      let success = await getUsername(bridge)

      // if it failed start polling
      if (!success) runPolling()
    })()
  }, [])

  function runPolling() {
    setTimeout(async () => {
      let success = await getUsername(bridge)

      // if it failed try again after timeout
      if (!success) runPolling()
    }, Config.SETUP_POLLING_DELAY)
  }

  async function getUsername(bridge: Bridge): Promise<boolean> {
    let response = await fetch(`https://${bridge.internalipaddress}/api`, {
      method: 'POST',
      body: JSON.stringify({
        devicetype: Config.APP_NAME,
      }),
    })

    let json = await response.json()

    json.map((item: any) => {
      if (item.success) {
        bridge.username = item.success.username

        // persist to cache
        setCache(cache)

        return true
      } else {
        console.error(item.error.description)
      }
    })

    return false
  }

  return (
    <>
      {isSetup ? (
        <p>Thanks, we're done here!</p>
      ) : (
        <div className="text-center">
          <Halo />
          <p className="muted">
            Now go click on the button in the bridge. I'll wait
          </p>
        </div>
      )}
    </>
  )
}

export default SetupBridge
