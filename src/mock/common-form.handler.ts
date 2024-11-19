import { http, HttpResponse } from "msw";

export const commonFormHandler = [
  http.post("/common-form", () => {
    return new HttpResponse(null, {status: 200});
  }),

  http.get("/common-form", () => {
    return HttpResponse.json({
      careerMonths: 12,
      hsAbsenceDays: 2,
      techCertificates: 3,
      majorDepartment: 1,
      volunteerScore: 10,
      bloodDonation: 5,
      nationalMerit: true,
      independenceMerit: false,
      corpExpScore: 80,
      indivExpScore: 75,
      multiChildScore: 5,
      careerApply: true,
      overseasApply: false,
      medicalApply: true,
      is_livelihood_recipient: false,
    });
  }),

  http.patch("/common-form", () => {
    return new HttpResponse(null, {status: 200});
  }),

  http.delete("/common-form", () => {
    return new HttpResponse(null, {status: 200});
  }),
]