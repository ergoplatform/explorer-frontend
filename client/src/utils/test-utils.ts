/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import { mount, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';

import { messages } from '../containers/connected-intl-provider/connected-intl-provider';

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider(
  { locale: 'en', messages: messages.en },
  {}
);
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node: JSX.Element): JSX.Element {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl(
  node: JSX.Element,
  { context, ...additionalOptions }: any = {}
): ShallowWrapper {
  return shallow(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    ...additionalOptions,
  });
}

export function mountWithIntl(
  node: JSX.Element,
  { context, childContextTypes, ...additionalOptions }: any = {}
): any {
  return mount(nodeWithIntlProp(node), {
    childContextTypes: Object.assign(
      {},
      { intl: intlShape },
      childContextTypes
    ),
    context: Object.assign({}, context, { intl }),
    ...additionalOptions,
  });
}

export function getMessageByKey(key: string): string {
  return messages.en[key];
}
