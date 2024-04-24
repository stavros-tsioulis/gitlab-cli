import { Camelize, JobSchema } from "@gitbeaker/rest";
import React from "react";
import SelectList from "../select/List.js";
import { Text } from "ink";
import Loading from "../Loading.js";
import { getApi } from "../../../utils/gitlab.js";

export type Props = {
  job: JobSchema | Camelize<JobSchema>
}

async function getGitVersionByJobTrace(job: JobSchema | Camelize<JobSchema>) {
  const api = getApi()
  const gitVersionRegex = /(git-[0-9]{8}-[0-9]{4}-[0-9a-f]{8})/
  const projectId = (job.pipeline.project_id || job.pipeline.projectId) as string
  const data = await api.JobArtifacts
    .downloadArchive(projectId, {jobId: job.id, artifactPath: 'version.env' })
    .then(blob => blob.text())
    .catch(() => "No git version found")
  const gitVersion = data.match(gitVersionRegex)?.at(0)
  return gitVersion || "No git version found"
}

export default function JobsSingle({ job }: Props) {
  const [data, setData] = React.useState<string>("")
  const [dataLoading, setDataLoading] = React.useState<boolean>(false)

  return (
    <React.Fragment>
      <SelectList options={[
        {
          name: "Get git version",
          id: "get-git-version",
          action: async () => {
            setDataLoading(true)
            const version = await getGitVersionByJobTrace(job)
            setData(version)
            setDataLoading(false)
          }
        }
      ]} />
      {dataLoading
        ? <Loading />
        : data
          ? <Text>{data}</Text>
          : <Text color="gray">Select an option</Text>
      }
    </React.Fragment>
  )
}
