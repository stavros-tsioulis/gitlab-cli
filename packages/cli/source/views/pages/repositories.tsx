import React, { useEffect, useState } from "react"
import RepositoryList from "../components/repository/List.js"
import Loading from "../components/Loading.js"
import { AccessLevel } from "@gitbeaker/rest";
import { getApi } from "../../utils/gitlab.js";

export default function Repositories() {
  const api = getApi()
  const [repositories, setRepositories] = useState<null | Awaited<ReturnType<typeof api.Projects.all>>>(null)

	useEffect(() => {
		api.Projects.all({ minAccessLevel: AccessLevel.GUEST })
      .then(setRepositories)
	}, [])

  return (
		<>
			{repositories
				? <RepositoryList projects={repositories} />
				: <Loading />
			}
		</>
	);
}
