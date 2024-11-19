import { http, HttpHandler, HttpResponse } from "msw";

export const authHandler: HttpHandler[] = [
  http.get('/auth/login', () => {
    return HttpResponse.json(
      {
        token: 'string',
      }
    )
  }),

  http.post('/auth/register', () => {
    return HttpResponse.json(
      {
        token: 'string',
      }
    )
  }),
]