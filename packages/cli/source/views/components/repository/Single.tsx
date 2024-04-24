import { Camelize, type ProjectSchema } from "@gitbeaker/rest"
import { Text, useInput } from "ink"
import React from "react"
import { setRoute, setRouteProps } from "../../route.js"

export type Props = {
  project: (ProjectSchema | Camelize<ProjectSchema>)
}

export default function Single({ project }: Props) {
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(0)

  useInput((_, key) => {
    if (key.downArrow)
      setSelectedOptionIndex((prev) => (prev + 1) % options.length)

    if (key.upArrow)
      setSelectedOptionIndex((prev) => (prev - 1 + options.length) % options.length)

    if (key.return) {
      const option = options[selectedOptionIndex]!
      option.action()
    }
  })

  const options = [
    {
      name: "Pipelines",
      action: () => {
        setRoute("pipelines")
        setRouteProps<"pipelines">({ projectId: project.id })
      }
    }
  ]

  return (
    <React.Fragment>
      {options.map((option, index) => (
        <Text key={option.name}>
          <Text color="green"> {selectedOptionIndex === index ? '>' : ' '} </Text>
          <Text>{option.name}</Text>
        </Text>
      ))}
    </React.Fragment>
  )
}
