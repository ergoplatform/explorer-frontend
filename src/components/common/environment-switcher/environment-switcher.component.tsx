import React from 'react';

import environment from '../../../config/environment';

import { DropdownComponent } from '../dropdown/dropdown.component';

import './environment-switcher.scss';

export class EnvironmentSwitcherComponent extends React.PureComponent {
  render(): JSX.Element | null {
    if (!environment.environments) {
      return null;
    }

    const [defaultEnvironment] = environment.environments;

    const options = environment.environments.map((option) => {
      return {
        label: option.name,
        value: option.url,
      };
    });

    const selectedOption = {
      label: defaultEnvironment.name,
      value: defaultEnvironment.url,
    };

    return (
      <div className="bi-environment-switcher">
        <DropdownComponent
          options={options}
          component="a"
          selected={selectedOption}
        />
      </div>
    );
  }
}
