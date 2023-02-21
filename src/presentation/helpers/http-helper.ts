import { type HttpResponse } from '../protocols/http'

export function badRequest (error: Error): HttpResponse {
  return {
    body: error,
    statusCode: 400
  }
}

export function ok (data: any): HttpResponse {
  return {
    body: data,
    statusCode: 200
  }
}
