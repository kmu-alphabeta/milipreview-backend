import { http, HttpHandler, HttpResponse } from "msw";

export const historyHandler: HttpHandler[] = [
  http.post("/history", () => {
    return new HttpResponse(null, {status: 200})
  }),

  http.get("/history", () => {
    return HttpResponse.json([
      {
        id: 1n,
        score: 85,
        predictedScore: 90.5,
        predictedPercent: 92.3,
      },
    ]);
  }),
]