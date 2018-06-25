import * as queryString from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class SearchResultsComponent extends React.Component<RouteComponentProps<{}>> {
  render (): JSX.Element {
    const { query } = queryString.parse(this.props.location.search);
    
    return (
      <div className='bi-search-results'>
        { query }
      </div>
    );
  }
}
