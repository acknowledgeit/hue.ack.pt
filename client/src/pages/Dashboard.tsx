import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Light } from '../components/Light'

interface DashboardProps {
  cache: any
  setCache: any
}

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  cache,
  setCache,
}) => {
  let { bridgeId } = useParams()
  const [lights, setLights] = useState<{ [id: string]: Light }>({})

  const bridge = cache.bridges.find((b: any) => b.id == bridgeId)

  useEffect(() => {
    const fetchLights = async () => {
      const response = await fetch(
        `http://${bridge.internalipaddress}/api/${bridge.username}/lights`
      )
      const lightsData = await response.json()
      setLights(lightsData)
    }

    fetchLights()
  }, [])

  const handleLightChange = async (id: any, state: any) => {
    // persist state to bridge
    const request = await fetch(
      `http://${bridge.internalipaddress}/api/${bridge.username}/lights/${id}/state`,
      {
        method: 'PUT',
        body: JSON.stringify({
          on: state.on,
          bri: Number(state.bri),
        }),
      }
    )
  }

  return (
    <>
      <h3>Lights</h3>

      {Object.entries(lights).map(([key, value]) => (
        <Light
          key={key}
          id={key}
          light={value}
          onChange={(state) => handleLightChange(key, state)}
        />
      ))}
    </>
  )
}

export default Dashboard
