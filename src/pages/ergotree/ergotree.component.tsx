import React from 'react';
import axios, { AxiosResponse } from 'axios';

import environment from 'src/config/environment';
import './ergotree.scss';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

export default class ErgotreeComponent extends React.Component<
  {},
  { hashedScript: string; constants: string; humanScript: string }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hashedScript: 'Please paste your favorite hashed ergo script.',
      constants: '',
      humanScript: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: { target: { value: string } }) {
    this.setState({
      hashedScript: event.target.value,
      humanScript: this.state.humanScript,
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    axios
      .post(`${environment.apiUrlV1}/ergotree/convert`, {
        hashed: this.state.hashedScript,
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Address api service. Request: ${environment.apiUrlV1}/ergotree/convert`
          );
        }
        this.setState({
          hashedScript: this.state.hashedScript,
          constants: response.data.constants,
          humanScript: response.data.script,
        });
        return Promise.resolve('');
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          this.setState({
            hashedScript: this.state.hashedScript,
            constants: this.state.constants,
            humanScript: error.response.data.reason,
          });
        }
      });
  }

  render() {
    return (
      <div className="bi-tree g-flex-column g-flex-column__item-fixed">
        <FormattedMessage id="common.pages.print-ergo-tree.title">
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-tree__header g-flex-column__item-fixed g-flex">
          <div className="bi-tree__title g-flex__item">
            <FormattedMessage id="components.print-ergo-tree.title" />
          </div>
        </div>

        <div className="bi-tree__body g-flex-column__item-fixed">
          <form onSubmit={this.handleSubmit} className="bi-tree__form-group">
            <div>
              <textarea
                className="bi-tree__input"
                placeholder={this.state.hashedScript}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className="btn-black" type="submit">
                Convert to human readable script
              </button>
            </div>
          </form>
          <h1>Constants</h1>
          <pre>{this.state.constants}</pre>
          <h1>Human readable script</h1>
          <pre>{this.state.humanScript}</pre>
        </div>
      </div>
    );
  }
}
