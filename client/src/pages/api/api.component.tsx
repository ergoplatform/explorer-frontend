import * as React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

export class ApiComponent extends React.PureComponent {
  render (): JSX.Element {
    return (
      <div className='bi-api'>
        <FormattedMessage id='common.pages.api.title'>
          {
            title => (
              <Helmet>
                <title>{ title }</title>
              </Helmet>
            )
          }
        </FormattedMessage>
        
        ok
      </div>
    );
  }
}
