import React from 'react'
import { useHistory } from 'react-router-dom'

interface BridgeProps {
  bridge: Bridge
}

export const Bridge: React.FC<BridgeProps> = ({ bridge }) => {
  const history = useHistory()

  function setupBridge() {
    history.push(`/setup/${bridge.id}`)
  }

  return (
    <div className="bridge-info" onClick={setupBridge}>
      {bridge.name} - {bridge.internalipaddress}
      <div className="bridge-info--details muted">
        <span>{bridge.id}</span>
      </div>
    </div>
  )
}

export default Bridge
