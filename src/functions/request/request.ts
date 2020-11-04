export default async function request(
  url: string,
  method = 'GET',
  headers = {},
  body = {}
): Promise<any> {
  const fetchModel = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
  };

  return fetch(
    url,
    method === 'GET' ? fetchModel : { ...fetchModel, body: JSON.stringify({ ...body }) }
  ).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.json());
  });
}
