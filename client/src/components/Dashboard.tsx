import * as React from 'react'
import { useHistory } from 'react-router-dom'

import { Toggle } from './Toggle'

export const Dashboard: React.FunctionComponent = (props) => {
  return (
    <>
      <p>Light 1</p>
      <Toggle onToggle={(on) => console.log('on: ', on)}>
        <Toggle.Button />
      </Toggle>

      <p>Light 2</p>
      <Toggle onToggle={(on) => console.log('on: ', on)}>
        <Toggle.Button />
      </Toggle>
    </>
  )
}
