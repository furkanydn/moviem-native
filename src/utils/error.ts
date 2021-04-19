import moment from 'moment';

export interface ResponseError {
  message: string;
  raisedAt: number;
}

export const CreateResponseError = (message: string): ResponseError => ({
  message,
  raisedAt: moment.now(),
});
