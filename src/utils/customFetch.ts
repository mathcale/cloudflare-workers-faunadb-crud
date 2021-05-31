import { errors } from 'faunadb';

export async function customFetch(url: string, params: any): Promise<any> {
  const signal = params.signal;
  delete params.signal;

  const abortPromise = new Promise((resolve) => {
    if (signal) {
      signal.onabort = resolve;
    }
  });

  return Promise.race([abortPromise, fetch(url, params)]);
}

export function getFaunaError(error: errors.FaunaHTTPError) {
  const { code, description } = error.requestResult.responseContent.errors[0];
  let status;

  switch (code) {
    case 'instance not found':
      status = 404;
      break;
    case 'instance not unique':
      status = 409;
      break;
    case 'permission denied':
      status = 403;
      break;
    case 'unauthorized':
    case 'authentication failed':
      status = 401;
      break;
    default:
      status = 500;
  }

  return { code, description, status };
}
