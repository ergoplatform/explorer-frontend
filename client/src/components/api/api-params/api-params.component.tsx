import * as React from 'react';

interface IApiParamsProps {
  params: any[];
}

import { ApiTypeComponent } from '../api-type/api-type.component';

import './api-params.scss';

export class ApiParamsComponent extends React.PureComponent<IApiParamsProps> {
  render (): JSX.Element {
    console.debug(this.props.params);
    
    return (
      <div className='bi-api-params'>
        <div className='bi-api-params__header'>
          Parameters
        </div>
        
        <div className='bi-table'>
          {
            this.props.params.map((param) => {
              return (
                <div className='bi-api-params__param bi-table__row' key={ param.name }>
                  <div className='bi-api-params__name bi-table__cell'>
                    { param.name }
                    { param.required && (<span className='bi-api-params__required'>*</span>) }
                    
                    <span className='bi-api-params__in'>{ param.in }</span>
                  </div>
                  
                  <div className='bi-table__cell'>
                    { param.description }
                  </div>
                  
                  <div className='bi-table__cell'>
                    <ApiTypeComponent schema={ param.schema }/>
                  </div>
                  
                  <div className='bi-table__cell'>
                    { param.schema.description }
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
