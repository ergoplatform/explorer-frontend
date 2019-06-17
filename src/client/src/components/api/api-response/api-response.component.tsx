import * as React from 'react';

interface IApiResponseProps {
  code: string;
  response: any;
}

import './api-response.scss';

export class ApiResponseComponent extends React.PureComponent<IApiResponseProps> {
  render (): JSX.Element {
    return (
      <div className='bi-api-response'>
        <div className='bi-api-response__header'>
          Response { this.props.code }
        </div>
        <div className='bi-api-response__body'>
          { Object.keys(this.props.response.content)
            .map((key) => {
              return <pre key={ key } className='bi-api-response__example g-scroll-y'>{
                JSON.stringify(this.getExample(this.props.response.content[key].schema), null, 2) }
                </pre>;
            }) }
        </div>
      </div>
    );
  }
  
  private getExample (schema: any): any {
    let response: any;
    
    switch (schema.type) {
      case 'object': {
        response = {};
        
        if (!schema.properties) {
          break;
        }
        
        Object.keys(schema.properties)
          .forEach((property: string) => {
            response[property] = this.getExample(schema.properties[property]);
          });
        
        break;
      }
      
      case 'array': {
        response = [];
        
        response.push(this.getExample(schema.items));
        
        break;
      }
      
      case 'string': {
        response = schema.example || '';
        
        break;
      }
      
      case 'integer':
      case 'float':
      case 'number': {
        response = schema.example || 0;
        break;
      }
      
      default: {
        response = schema.type;
      }
    }
    
    return response;
  }
}
