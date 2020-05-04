import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import './not-found.scss';

export default class NotFoundComponent extends React.Component {
  render(): JSX.Element {
    return (
      <div className="bi-not-found">
        <FormattedMessage id="common.pages.not-found.title">
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <h2 className="bi-not-found__title">
          <FormattedMessage id="components.not-found.title" />
        </h2>
      </div>
    );
  }
}
