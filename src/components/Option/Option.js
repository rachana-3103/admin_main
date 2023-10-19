import React from 'react'

export default function Option(props) {
  return (
    <option value={props.data.id} key="1">{props.data.name}</option>
  )
}
