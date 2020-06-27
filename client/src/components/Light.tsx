import React, { useState, useEffect, useRef } from 'react'

import { Switch } from '../components/Switch'
import { Range } from '../components/Range'
import useDeferredEffect from '../hooks/useDeferredEffect'

interface LightProps {
  id: string
  light: Light
  onChange: (state: any) => void
}

export const Light: React.FC<LightProps> = ({ id, light, onChange }) => {
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
    <div className="box shadow">
      <div
        className="flex flex-row"
        style={{ padding: '1em', alignItems: 'center' }}
      >
        <div className="light-info flex-grow">
          <span>{light.name}</span>
        </div>
        <Switch on={state.on} onClick={toggleLight} />
      </div>
      <div className="flex flex-row">
        <Range
          min={1}
          max={254}
          step={1}
          value={state.bri}
          onChange={setLightBrightness}
        />
      </div>
    </div>
  )
}
