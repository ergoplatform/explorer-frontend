import { stopStructFetch, startStructFetch } from 'redux-struct';
import axios from 'axios';

export const fetchStruct = (
  dispatch: any,
  structId: string,
  method: string,
  url: string,
  params: any = null
) => {
  dispatch(startStructFetch(structId));

  return axios[method](url, params)
    .then((res: any) => res.body || res.data)
    .then((result: any) => {
      if (!result) {
        dispatch(stopStructFetch(structId, result));

        return Promise.resolve(result);
      }

      const error = result.errors || result.error;

      if (error) {
        dispatch(stopStructFetch(structId, new Error(error)));

        return Promise.reject(new Error(error));
      }

      dispatch(stopStructFetch(structId, result));

      return Promise.resolve(result);
    })
    .catch((error: Error) => {
      dispatch(stopStructFetch(structId, error));

      return Promise.reject(error);
    });
};
