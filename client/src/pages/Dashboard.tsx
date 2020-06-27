import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Light } from '../components/Light'
import { Scene } from '../components/Scene'
import { Tracing } from 'trace_events'

interface DashboardProps {
  cache: any
  setCache: any
}

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  cache,
}) => {
  let { bridgeId } = useParams()
  const [lights, setLights] = useState<{ [id: string]: Light }>({})
  const [scenes, setScenes] = useState<{ [id: string]: Scene }>({})

  const bridge = cache.bridges.find((b: any) => b.id == bridgeId)

  useEffect(() => {
    const fetchLights = async () => {
      const response = await fetch(
        `https://${bridge.internalipaddress}/api/${bridge.username}/lights`
      )
      const lightsData = await response.json()
      setLights(lightsData)
    }

    fetchLights()
  }, [])

  useEffect(() => {
    const fetchScenes = async () => {
      const response = await fetch(
        `https://${bridge.internalipaddress}/api/${bridge.username}/scenes`
      )
      const scenesData = (await response.json()) as { [id: string]: Scene }

      let scenesArr = Object.entries(scenesData).map(([id, scene]) => {
        return {
          ...scene,
          id,
        }
      })

      scenesArr = scenesArr.filter((scene) => !scene.recycle)

      const filteredScenes = Object.fromEntries(
        Object.entries(scenesData).filter(([key, scene]) => !scene.recycle)
      )
      setScenes(filteredScenes)
    }

    fetchScenes()
  }, [])

  const handleLightChange = async (id: any, state: any) => {
    // persist state to bridge
    const request = await fetch(
      `https://${bridge.internalipaddress}/api/${bridge.username}/lights/${id}/state`,
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

      <div className="lights-container">
        {Object.keys(lights).length ? (
          Object.entries(lights).map(([key, value]) => (
            <Light
              key={key}
              id={key}
              light={value}
              onChange={(state) => handleLightChange(key, state)}
            />
          ))
        ) : (
          <p className="muted">No lights</p>
        )}
      </div>

      <h3> Scenes </h3>

      <div className="scenes-container">
        {Object.keys(scenes).length ? (
          Object.entries(scenes).map(([key, value]) => (
            <Scene key={key} id={key} scene={value} />
          ))
        ) : (
          <p className="muted">No scenes</p>
        )}
      </div>
    </>
  )
}

export default Dashboard
