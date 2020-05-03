import React from 'react';
import { stubInterface } from 'ts-sinon';

import { shallowWithIntl } from '../../../utils/test-utils';
import { BlockAdproofsComponent } from './block-adproofs.component';

import { FullBlock } from '../../../models/generated/fullBlock';

describe('Components | Block AdProofs', () => {
  let block: FullBlock;

  beforeEach(() => {
    block = stubInterface<FullBlock>();
  });

  it('should render without crashing', () => {
    const wrapper = shallowWithIntl(<BlockAdproofsComponent block={block} />);

    expect(wrapper.length).toBe(1);
  });
});
