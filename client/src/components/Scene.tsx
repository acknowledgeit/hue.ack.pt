import React from 'react'

interface SceneProps {
  id: string
  scene: Scene
}

export const Scene: React.FC<SceneProps> = ({ id, scene }) => {
  return <div>Scene {scene.name}</div>
}
