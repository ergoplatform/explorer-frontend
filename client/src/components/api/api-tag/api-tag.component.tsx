import React from 'react';

interface IApiTagProps {
  tagName: string;
  openapi: any;
}

import { ApiPathComponent } from '../api-path/api-path.component';

import './api-tag.scss';

export class ApiTagComponent extends React.Component<IApiTagProps> {
  private tag: any;
  private paths: any = {};
  
  shouldComponentUpdate (nextProps: any): boolean {
    return nextProps.tagName !== this.props.tagName;
  }
  
  render (): JSX.Element {
    this.tag = this.props.openapi.tags.find((item: any) => {
      return item.name === this.props.tagName;
    });
    
    if (this.tag) {
      this.paths = {};
      
      Object.keys(this.props.openapi.paths)
        .forEach((pathName: string) => {
          const path = this.props.openapi.paths[pathName];
          
          Object.keys(path)
            .forEach((type: string) => {
              if (path[type].tags && path[type].tags.includes(this.tag.name)) {
                if (!this.paths[pathName]) {
                  this.paths[pathName] = {
                    parameters: path.parameters,
                    paths: []
                  };
                }
                
                this.paths[pathName].paths.push({
                  path: path[type],
                  type
                });
              }
            });
        });
    }
    
    return (
      <div className='bi-api-tag'>
        { this.tag && this.renderBody() }
      </div>
    );
  }
  
  private renderBody (): JSX.Element {
    return (
      <div className='bi-api-tag__body'>
        <div className='bi-api-tag__title'>
          <a id={ this.tag.name }/>
          { this.tag.name }
          
          <div className='bi-api-tag__subtitle'>
            { this.tag.description }
          </div>
        </div>
        
        <div className='bi-api-tag__paths'>
          { Object.keys(this.paths)
            .map((path) => {
              return (
                <ApiPathComponent key={ path }
                                  pathName={ path }
                                  paths={ this.paths[path].paths }
                                  parameters={ this.paths[path].parameters }/>
              );
            }) }
        </div>
      </div>
    );
  }
}
