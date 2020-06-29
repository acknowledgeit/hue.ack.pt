import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Light } from '../components/Light'
import { Scene } from '../components/Scene'
import Group from '../components/Group'

import * as hueBridgeClient from '../client/hueClient'

interface DashboardProps {
  cache: any
  setCache: any
}

export const Dashboard: React.FC<DashboardProps> = ({ cache }) => {
  let { bridgeId } = useParams()
  const [lights, setLights] = useState<{ [id: string]: Light }>({})
  const [groups, setGroups] = useState<{ [id: string]: Group }>({})
  const [scenes, setScenes] = useState<{ [id: string]: Scene }>({})

  const bridge = cache.bridges.find((b: Bridge) => b.id == bridgeId)

  useEffect(() => {
    const fetchLights = async () => {
      setLights(
        await hueBridgeClient.getLights(
          bridge.internalipaddress,
          bridge.username
        )
      )
    }

    fetchLights()
  }, [])

  useEffect(() => {
    const fetchGroups = async () => {
      setGroups(
        await hueBridgeClient.getGroups(
          bridge.internalipaddress,
          bridge.username
        )
      )
    }

    fetchGroups()
  }, [])

  useEffect(() => {
    const fetchScenes = async () => {
      setScenes(
        await hueBridgeClient.getScenes(
          bridge.internalipaddress,
          bridge.username
        )
      )
    }

    fetchScenes()
  }, [])

  const handleLightChange = async (id: any, state: any) => {
    hueBridgeClient.updateLight(
      bridge.internalipaddress,
      bridge.username,
      id,
      state
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

      <h3>Groups</h3>

      <div className="groups-container">
        {Object.keys(groups).length ? (
          Object.entries(groups).map(([key, group]) => (
            <Group key={key} id={key} group={group} />
          ))
        ) : (
          <p className="muted">No groups</p>
        )}
      </div>

      <h3>Scenes</h3>

      <div className="scenes-container">
        {Object.keys(scenes).length ? (
          Object.entries(scenes).map(([key, scene]) => (
            <Scene key={key} id={key} scene={scene} />
          ))
        ) : (
          <p className="muted">No scenes</p>
        )}
      </div>
    </>
  )
}

export default Dashboard
