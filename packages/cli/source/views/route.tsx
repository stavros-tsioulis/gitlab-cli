import React, { useState } from "react"
import { Text } from "ink"

import Repositories from "../views/pages/repositories.js"
import Repository from "./pages/repository.js"
import Pipelines from "./pages/pipelines.js"
import Jobs from "./pages/jobs.js"
import { Camelize, JobSchema } from "@gitbeaker/rest"
import Job from "./pages/job.js"

export type RouteName =
  | "repositories"
  | "repository"
  | "pipelines"
  | "jobs"
  | "job"

export type RouteProps = {
  repositories: {},
  repository: { id: number }
  pipelines: { projectId: number }
  jobs: { projectId: number, pipelineId: number }
  job: { job: JobSchema | Camelize<JobSchema> }
}

let routeSetter: React.Dispatch<React.SetStateAction<RouteName>> | null = null
let routePropsSetter: React.Dispatch<React.SetStateAction<RouteProps[RouteName]>> | null = null

export function setRoute(route: RouteName) {
  if (routeSetter)
    routeSetter(route)
}

export function setRouteProps<T extends RouteName>(props: RouteProps[T]) {
  if (routePropsSetter)
    routePropsSetter(props)
}


export default function AppRoute() {
  const [currentRoute, setCurrentRoute] = useState<RouteName>("repositories");
  const [routeProps, setRouteProps] = useState<RouteProps[RouteName]>([])
  routeSetter = setCurrentRoute
  routePropsSetter = setRouteProps

  return (() => {
    switch (currentRoute) {
      case "repositories":
        return <Repositories />
      case "repository": {
        const props = routeProps as RouteProps["repository"]
        return <Repository {...props} />
      }
      case 'pipelines': {
        const props = routeProps as RouteProps["pipelines"]
        return <Pipelines {...props} />
      }
      case 'jobs': {
        const props = routeProps as RouteProps["jobs"]
        return <Jobs {...props} />
      }
      case 'job': {
        const props = routeProps as RouteProps["job"]
        return <Job {...props} />
      }
      default:
        return <Text>404</Text>
    }
  })()
}
