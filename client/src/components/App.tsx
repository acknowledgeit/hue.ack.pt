import * as React from 'react'
import { Toggle } from './Toggle'

export const App = () => (
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
