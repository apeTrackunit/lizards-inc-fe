export const ApiUrl = process.env.NX_API_URL;

export function isLoggedIn(req) {
  return req.headers.get('Authorization') === 'Bearer fake-token';
}
