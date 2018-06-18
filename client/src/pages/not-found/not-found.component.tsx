import * as React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

export class NotFoundComponent extends React.Component {
  render (): JSX.Element {
    return (
      <div>
        <FormattedMessage id='common.pages.not-found.title'>
          {
            title => (
              <Helmet>
                <title>{ title }</title>
              </Helmet>
            )
          }
        </FormattedMessage>
        Not found
      </div>
    );
  }
}
