import React from "react";
import { getApi } from "../../utils/gitlab.js";
import SelectList from "../components/select/List.js";
import Loading from "../components/Loading.js";
import { setRoute, setRouteProps } from "../route.js";

export type Props = {
  projectId: number
  pipelineId: number
}

export default function Jobs({ projectId, pipelineId }: Props) {
  const api = getApi()
  const [jobs, setJobs] = React.useState<null | Awaited<ReturnType<typeof api.Jobs.all<false>>>>(null)

  React.useEffect(() => {
    api.Jobs.all(projectId, { pipelineId }).then(setJobs)
  }, [])

  return (
    jobs
      ? <SelectList options={jobs.map(job => ({
          name: `${job.name} (${job.status})`,
          category: job.stage,
          id: job.id,
          action: () => {
            setRoute("job")
            setRouteProps<"job">({ job })
          }
        }))} />
      : <Loading />
  )
}
