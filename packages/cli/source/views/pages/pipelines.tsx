import React from "react"
import { getApi } from "../../utils/gitlab.js"
import PipelinesList from "../components/jobs/List.js"
import Loading from "../components/Loading.js"

export type Props = {
  projectId: number
}

export default function Pipelines({ projectId }: Props) {
  const api = getApi()
  const [pipelines, setPipelines] = React.useState<null | Awaited<ReturnType<typeof api.Pipelines.all<false>>>>(null)

  React.useEffect(() => {
    api.Pipelines.all(projectId, { maxPages: 1, perPage: 6 })
      .then(setPipelines)
  }, [])

  return (
    pipelines
      ? <PipelinesList pipelines={pipelines} />
      : <Loading />
  )
}
