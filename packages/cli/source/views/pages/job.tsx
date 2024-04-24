import React from "react";
import JobsSingle from "../components/jobs/Single.js";
import { Camelize, JobSchema } from "@gitbeaker/rest";

export type Props = {
  job: JobSchema | Camelize<JobSchema>
}

export default function Job({ job }: Props) {
  return (
    <JobsSingle job={job} />
  )
}
