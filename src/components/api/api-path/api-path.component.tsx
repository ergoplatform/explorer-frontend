import React from 'react';

import { ApiParamsComponent } from '../api-params/api-params.component';
import { ApiResponseComponent } from '../api-response/api-response.component';

import './api-path.scss';
import { AngleIcon } from 'src/components/common/icons/common.icons';

interface IApiPathProps {
  pathName: string;
  paths: any[];
}

export class ApiPathComponent extends React.PureComponent<IApiPathProps> {
  state = {
    isOpen: false,
  };

  toggleMenu = () => this.setState({ isOpen: !this.state.isOpen });

  render(): JSX.Element {
    return (
      <div className="bi-api-path">
        {Object.keys(this.props.paths).map((path: any, index) => {
          return (
            <div className="bi-api-path__item" key={index}>
              <div
                className="bi-api-path__item-header"
                onClick={() => this.toggleMenu()}
              >
                <span className="bi-api-path__type">{path}</span>
                <span className="bi-api-path__pathname">
                  {this.props.pathName}
                </span>
                <span className="bi-api-path__summary">
                  {this.props.paths[path].operationId}
                </span>
                <div
                  className={`bi-api-path__icon ${
                    this.state.isOpen ? '' : 'bi-api-path__icon--open'
                  }`}
                >
                  <AngleIcon />
                </div>
              </div>

              {this.state.isOpen && (
                <div className="bi-api-path__item-body">
                  {this.props.paths[path].parameters && (
                    <div className="bi-api-path__params">
                      <ApiParamsComponent
                        params={[...(this.props.paths[path].parameters || [])]}
                      />
                    </div>
                  )}

                  {Object.keys(this.props.paths[path].responses).map(
                    (responseCode, responseIndex) => {
                      return (
                        <ApiResponseComponent
                          key={responseIndex}
                          code={responseCode}
                          response={
                            this.props.paths[path].responses[responseCode]
                          }
                        />
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
