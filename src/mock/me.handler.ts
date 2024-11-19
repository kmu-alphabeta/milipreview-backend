import { http, HttpHandler, HttpResponse } from "msw";

export const meHandler: HttpHandler[] = [
  http.get('/me', () => {
    return HttpResponse.json({
      id: BigInt(1),
      name: 'name',
      narasarang: 'narasarang@narasarang.com',
      email: 'email@email.com',
      address: 'address',
      birth: '2000-01-01',
      phone: '010-1234-5678',
      militaryServiceOffice: 'militaryServiceOffice',
      applicantRegionOffice: 'applicantRegionOffice',
    });
  }),

  http.patch('/me', () => {
    return new HttpResponse(null, { status: 200 });
  }),
];