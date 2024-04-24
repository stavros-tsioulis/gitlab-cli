import { Gitlab } from "@gitbeaker/rest"
import { getGitlabToken } from "./token.js"

export class GitbeakerError extends Error {
  constructor(
    message: string,
    options?: {
      case: {
        description: string
        request: Request,
        response: Response
      }
    }
  ) {
    super(message, options as ErrorOptions)
    this.name = "GitbeakerError"
  }
}

let api: InstanceType<typeof Gitlab>

export function getApi(): InstanceType<typeof Gitlab>{
  if (!api)
    api = new Gitlab({
      token: getGitlabToken(),
      host: "https://gitlab.com"
    })

  return api
}
