import { Action, Dispatch } from 'redux';
import SwaggerParser from 'swagger-parser';

import { GET_API, GET_API_SUCCESS } from '../constants/api.types';

import apiSpec from 'apiSpec';

export interface ApiActions {
  getApi (): void;
}

export const ApiActions: any = {
  getApi (): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_API
      });

      SwaggerParser.validate(apiSpec)
        .then(data => {
          dispatch({
            payload: {
              data
            },
            type: GET_API_SUCCESS
          });
        });
    };
  }
};
