import React, { useState, useEffect, useRef } from 'react'

import { Switch } from '../components/Switch'
import useDeferredEffect from '../hooks/useDeferredEffect'

interface LightProps {
  id: string
  light: Light
  onChange: (state: any) => void
}

export const Light: React.FunctionComponent<LightProps> = ({
  id,
  light,
  onChange,
}) => {
  const [state, SetState] = useState(light.state)

  const setLightBrightness = (event: React.ChangeEvent<HTMLInputElement>) => {
    // update local state
    SetState({ ...state, bri: event.target.value })
  }

  const toggleLight = () => {
    SetState({ ...state, on: !state.on })
  }

  useDeferredEffect(() => {
    onChange(state)
  }, [state])

  return (
    <div>
      <p>{light.name}</p>
      <Switch on={state.on} onClick={toggleLight} />
      <input
        type="range"
        name="brightness"
        min="1"
        max="254"
        step="1"
        value={state.bri}
        onChange={setLightBrightness}
      />
    </div>
  )
}
