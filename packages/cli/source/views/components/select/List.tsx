import { Text, useInput } from "ink";
import React from "react";

export type Props = {
  options: {
    name: string
    category?: string
    id: string | number
    action: Function
  }[]
}

export default function SelectList({ options }: Props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  useInput((_, key) => {
    if (key.downArrow)
      setSelectedIndex((prev) => (prev + 1) % options.length)

    if (key.upArrow)
      setSelectedIndex((prev) => (prev - 1 + options.length) % options.length)

    if (key.return)
      options[selectedIndex]?.action()
  })

  return (
    <React.Fragment>
      {options.map((option, index) => (
        <Text key={option.id}>
          <Text color="green"> {selectedIndex === index ? '>' : ' '} </Text>
          {option.category && <Text color="gray">{option.category} / </Text>}
          <Text>{option.name}</Text>
        </Text>
      ))}
    </React.Fragment>
  )
}
