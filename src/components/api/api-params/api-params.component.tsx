import React from 'react';

import { ApiTypeComponent } from '../api-type/api-type.component';

import './api-params.scss';

interface IApiParamsProps {
  params: any[];
}

export class ApiParamsComponent extends React.PureComponent<IApiParamsProps> {
  render(): JSX.Element {
    return (
      <div className="bi-api-params">
        <div className="bi-api-params__header">Parameters</div>

        <div className="bi-table">
          {this.props.params.map((param) => {
            return (
              <div
                className="bi-api-params__param bi-table__row"
                key={param.name}
              >
                <div className="bi-api-params__name bi-table__cell">
                  {param.name}
                  {param.required && (
                    <span className="bi-api-params__required">*</span>
                  )}

                  <span className="bi-api-params__in">{param.in}</span>
                </div>

                <div className="bi-table__cell">
                  {param.description || 'Parameter description is empty'}
                </div>

                <div className="bi-table__cell">
                  <ApiTypeComponent schema={param.schema} />
                </div>

                <div className="bi-table__cell">
                  {param.schema.description || 'Schema description is empty'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
