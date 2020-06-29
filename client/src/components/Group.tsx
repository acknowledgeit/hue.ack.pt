import React from 'react'

interface GroupProps {
  id: string
  group: Group
}

export const Group: React.FC<GroupProps> = ({ group }) => {
  return <div>{group.name}</div>
}

export default Group
