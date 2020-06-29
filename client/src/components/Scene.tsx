import React from 'react'

interface SceneProps {
  id: string
  scene: Scene
}

export const Scene: React.FC<SceneProps> = ({ scene }) => {
  return <div>{scene.name}</div>
}

export default Scene
