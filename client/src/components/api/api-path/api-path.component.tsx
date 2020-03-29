import React from 'react';

import { ApiParamsComponent } from '../api-params/api-params.component';
import { ApiResponseComponent } from '../api-response/api-response.component';

import './api-path.scss';

interface IApiPathProps {
  pathName: string;
  parameters: any[];
  paths: any[];
}

export class ApiPathComponent extends React.PureComponent<IApiPathProps> {
  render (): JSX.Element {
    return (
      <div className='bi-api-path'>
        { this.props.paths.map((path: any, index) => {
          return (
            <div className='bi-api-path__item' key={ index }>
              <div className='bi-api-path__item-header'>
                <span className='bi-api-path__type'>{ path.type }</span>

                <span className='bi-api-path__pathname'>{ this.props.pathName }</span>

                <span className='bi-api-path__summary'>{ path.path.summary }</span>
              </div>

              <div className='bi-api-path__item-body'>
                { (this.props.parameters || path.path.parameters) &&
                <div className='bi-api-path__params'>
                  <ApiParamsComponent params={ [...(this.props.parameters || []), ...(path.path.parameters || [])] }/>
                </div>
                }

                { Object.keys(path.path.responses)
                  .map((responseCode, responseIndex) => {
                    return (<ApiResponseComponent key={ responseIndex }
                                                  code={ responseCode }
                                                  response={ path.path.responses[responseCode] }/>);
                  })
                }
              </div>
            </div>
          );
        }) }
      </div>
    );
  }
}
