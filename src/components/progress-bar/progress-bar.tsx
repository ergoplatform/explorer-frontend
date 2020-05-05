import React, { PureComponent } from 'react';
import NProgress from 'nprogress';
import './progress-bar.scss';

interface ProgressProps {
  className: string;
}

export class ProgressBar extends PureComponent<ProgressProps> {
  componentDidMount() {
    NProgress.start();
  }

  componentWillUnmount() {
    NProgress.done();
  }

  render() {
    return <div className={this.props.className}>Loading Page...</div>;
  }
}

export default ProgressBar;
