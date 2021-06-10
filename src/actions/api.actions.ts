import { Action, Dispatch } from 'redux';
import { stopStructFetch, startStructFetch } from 'redux-struct';
import SwaggerParser from '@apidevtools/swagger-parser';

import { GET_OPENAPI_YAML_STRUCT } from '../constants/struct.types';
import environment from 'src/config/environment';

// import apiSpec from 'apiSpec';
// import { ApiService } from '../services/api.service';

export interface ApiDocsActions {
  getApiDocs(): void;
}

export const ApiDocsActions: any = {
  getApiDocs(): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch(startStructFetch(GET_OPENAPI_YAML_STRUCT));

      SwaggerParser.validate(`${environment.apiBaseUrl}/v1/docs/openapi`).then(
        (data) => {
          dispatch(stopStructFetch(GET_OPENAPI_YAML_STRUCT, data));
        }
      );
    };
  },
};
