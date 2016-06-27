import { Response } from '@angular/http';

/** Parse server data to json */
export function parseJson(res: Response) {
  let body = res.json();
  return body;
}

/** Log error any errors */
export function handleError(error: any) {
  let errorMsg = error.message || 'Server error';
  console.log(errorMsg);
}