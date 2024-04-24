import React from "react";
import { Camelize, type PipelineSchema } from "@gitbeaker/rest";
import SelectList from "../select/List.js";
import { setRoute, setRouteProps } from "../../route.js";

export type Props = {
  pipelines: (PipelineSchema | Camelize<PipelineSchema>)[]
}

export default function List({ pipelines }: Props) {
  return (
    <SelectList options={pipelines.map(pipeline => ({
      name: pipeline.id.toString(),
      category: pipeline.ref,
      id: pipeline.id,
      action: () => {
        setRoute("jobs")
        setRouteProps<"jobs">({ projectId: (pipeline.projectId || pipeline.project_id) as number, pipelineId: pipeline.id })
      }
    }))} />
  )
}
