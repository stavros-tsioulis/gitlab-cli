import React, { useEffect, useState } from "react"
import { Box, Text } from "ink"
import { getApi } from "../../utils/gitlab.js"
import Loading from "../components/Loading.js"
import RepositorySingle from "../components/repository/Single.js"

export type Props = {
  id: number
}

export default function Repository({ id }: Props) {
  const api = getApi()
  const [repository, setRepository] = useState<null | Awaited<ReturnType<typeof api.Projects.show<false>>>>(null)

  useEffect(() => {
    api.Projects.show(id)
      .then(setRepository)
  }, [])

  return (
    <>
      {repository
        ? <>
            <Box alignItems="center" borderStyle="single" borderTop={false} borderRight={false} borderLeft={false} borderBottomColor="#c21fb7">
              <Text color="gray">Selected project: </Text>
              <Box borderColor="gray" borderStyle="round">
                <Text color="pink">
                  {repository.name}
                </Text>
              </Box>
            </Box>
            <RepositorySingle project={repository} />
          </>
        : <Loading />
      }
    </>
  )
}
