export const ApiUrl = 'http://146.148.16.119';

export function isLoggedIn(req) {
  return req.headers.get('Authorization') === 'Bearer fake-token';
}
