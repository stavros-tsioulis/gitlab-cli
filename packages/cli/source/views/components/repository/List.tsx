import { type ProjectSchema } from "@gitbeaker/rest"
import { Text, useInput } from "ink"
import React from "react"
import { setRoute, setRouteProps } from "../../route.js"

export type Props = {
  projects: ProjectSchema[]
}

export default function List({ projects }: Props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  useInput((_, key) => {
    if (key.downArrow)
      setSelectedIndex((prev) => (prev + 1) % projects.length)

    if (key.upArrow)
      setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length)

    if (key.return) {
      const project = projects[selectedIndex]!
      setRoute('repository')
      setRouteProps<'repository'>({ id: project.id })
    }
  })

  return (
    <React.Fragment>
      {projects.map((repo, index) => (
        <Text key={repo.id}>
          <Text color="green"> {selectedIndex === index ? '>' : ' '} </Text>
          <Text color="gray">{repo.namespace.name} / </Text>
          <Text>{repo.name}</Text>
        </Text>
      ))}
    </React.Fragment>
  )
}