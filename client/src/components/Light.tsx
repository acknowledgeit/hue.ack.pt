import React, { useState } from 'react'

import { Switch } from '../components/Switch'
import LumenCache from '../shared/cache'

interface LightProps {
  id: string
  light: Light
}

export const Light: React.FunctionComponent<LightProps> = ({ id, light }) => {
  const [state, SetState] = useState(light.state)
  const cachedState = LumenCache.getCachedState()
  const bridge = cachedState.bridges[0]

  const setLightBrightness = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // update local state
    SetState({ ...state, bri: event.target.value })
  }

  const persistLightBrightness = async () => {
    console.log(state.bri)

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

  const setLightState = async () => {
    // switch state
    state.on = !state.on

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

    // update local state
    SetState({ ...state, on: state.on })
  }

  return (
    <div>
      <p>{light.name}</p>
      <Switch on={state.on} onClick={setLightState} />
      <input
        type="range"
        name="brightness"
        min="1"
        max="254"
        step="1"
        value={state.bri}
        onChange={setLightBrightness}
        onBlur={persistLightBrightness}
      />
    </div>
  )
}
