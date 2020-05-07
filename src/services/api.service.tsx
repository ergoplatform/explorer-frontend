import environment from '../config/environment';
import { fetchStruct } from '../utils/fetchStruct';
import { GET_OPENAPI_YAML_STRUCT } from '../constants/struct.types';

export class ApiService {
  static get apiUrl(): string {
    return `${environment.apiUrl}`;
  }

  static getOpenApiFile(dispatch: any): any {
    return fetchStruct(
      dispatch,
      GET_OPENAPI_YAML_STRUCT,
      'get',
      `${ApiService.apiUrl}/docs/openapi`
    );
  }
}
