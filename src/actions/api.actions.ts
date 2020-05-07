import { Action, Dispatch } from 'redux';
import SwaggerParser from '@apidevtools/swagger-parser';

import { GET_API, GET_API_SUCCESS } from '../constants/api.types';
import environment from 'src/config/environment';

// import apiSpec from 'apiSpec';
// import { ApiService } from '../services/api.service';

export interface ApiActions {
  getApi(): void;
}

export const ApiActions: any = {
  getApi(): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_API,
      });

      SwaggerParser.validate(`${environment.apiUrl}/docs/openapi`).then(
        (data) => {
          dispatch({
            payload: {
              data,
            },
            type: GET_API_SUCCESS,
          });
        }
      );
    };
  },
};
