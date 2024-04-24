import { Text } from "ink"
import Spinner from "ink-spinner"
import React from "react"

export default function Loading() {
  return (
    <Text>
      <Text color="green">
        <Spinner  />
      </Text>
      {' Loading...'}
    </Text>
  )
}
