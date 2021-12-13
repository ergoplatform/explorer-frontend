import { Action, Dispatch } from 'redux';
import { stopStructFetch, startStructFetch } from 'redux-struct';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';

export interface Struct<T, E> {
  data?: T;
  isFetching: boolean;
  errors?: E;
}

export interface StructFlowOpts<T> {
  transformResponse?(d: T): T | Promise<T>;
  dispatch: Dispatch<Action>;
}

const defaultOpts: StructFlowOpts<any> = {
  transformResponse: (d) => d,
  dispatch: (d) => d,
};

const cancelTokenSource: Record<string, CancelTokenSource> = {};

const generateCancelTokenSource = (structId: string) => {
  cancelTokenSource[structId] = axios.CancelToken.source();
  return cancelTokenSource[structId];
};

export const fetchStruct = <T>(
  structId: string,
  axiosParams: AxiosRequestConfig,
  opts: StructFlowOpts<T> = defaultOpts
) => {
  const { dispatch, transformResponse } = opts;
  dispatch(startStructFetch(structId));

  if (cancelTokenSource[structId]) {
    cancelTokenSource[structId].cancel('Canceled');
  }

  const { token } = generateCancelTokenSource(structId);

  return axios
    .request({ ...axiosParams, cancelToken: token })
    .then((res: AxiosResponse<T>) => res.data)
    .then(transformResponse)
    .then((result: T) => {
      if (!result) {
        dispatch(stopStructFetch(structId, result));

        return Promise.resolve(result);
      }

      const error = (result as any).errors || (result as any).error;

      if (error) {
        dispatch(stopStructFetch(structId, new Error(error)));

        return Promise.reject(new Error(error));
      }

      dispatch(stopStructFetch(structId, result));

      return Promise.resolve(result);
    })
    .catch((error: Error) => {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error?.message);
        return;
      }
      dispatch(stopStructFetch(structId, error));

      return Promise.reject(error);
    });
};
