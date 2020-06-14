import React, { FunctionComponent, useEffect, useState } from 'react'

import Bridge from '../components/Bridge'
import Config from '../shared/config'
import { useParams } from 'react-router-dom'

interface BridgeInfo {
  id: string
  internalipaddress: string
}

interface BridgeDetails extends BridgeInfo {
  name: string
}

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

  async function getUsername(bridge: BridgeDetails): Promise<boolean> {
    let response = await fetch(`http://${bridge.internalipaddress}/api`, {
      method: 'POST',
      body: JSON.stringify({
        devicetype: Config.APP_NAME,
      }),
    })

    let json = await response.json()

    json.map((item: any) => {
      if (item.success) {
        console.log('Success!')
        console.log('Username: ', item.sucess.username)
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
        <p>Now go click on the button in the bridge. I'll wait</p>
      )}
    </>
  )
}

export default SetupBridge
