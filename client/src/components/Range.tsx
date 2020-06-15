import React from 'react'

import './Range.styles.css'

export interface RangeProps {
  min: number
  max: number
  step: number
  value: number
  label?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Range = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
}: RangeProps) => {
  return (
    <label aria-label={label || 'Range'} className="flex flex-grow">
      <input
        className="range-input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
