import { Response, Headers, RequestOptions } from '@angular/http';

/** Parse server data to json */
export function parseJson(res: Response) {
  let body = res.json();
  return body;
}

/** Log error any errors */
export function handleError(error: Response) {
  let errorBody = '';
  try {
    errorBody = error.json();
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

/** Prepare data for posting to server via http */
export function packageForPost(data) {
  let body;
  try {
    body = JSON.stringify(data);
  } catch (err) {
    console.log(err, 'data failed to string: ', data);
  }
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return {
    body: body,
    options: options
  };
}