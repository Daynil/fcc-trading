import { Response } from '@angular/http';

/** Parse server data to json */
export function parseJson(res: Response) {
  let body = res.json();
  return body;
}

/** Log error any errors */
export function handleError(error: Response) {
  let errorBody = '';
  try {
    errorBody = error.json()
  } catch (jsonParseError) {
    errorBody = error.toString();
  }
  let errorParsed = {
    status: error.status,
    statusText: error.statusText,
    errorBody
  };
  console.log(errorParsed);
}