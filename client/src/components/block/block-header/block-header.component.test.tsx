import React from 'react';
import { stubInterface } from 'ts-sinon';

import { shallowWithIntl } from '../../../utils/test-utils';

import { FullBlock } from '../../../models/generated/fullBlock';
import { InlineResponse2001References } from '../../../models/generated/inlineResponse2001References';

import { BlockHeaderComponent } from './block-header.component';

describe('Components | Block Header', () => {
  let block: FullBlock;
  let references: InlineResponse2001References;

  beforeEach(() => {
    block = stubInterface<FullBlock>();
    references = stubInterface<InlineResponse2001References>();
  });

  it('should render without crashing', () => {
    const wrapper = shallowWithIntl(
      <BlockHeaderComponent
        block={block}
        prevLink={''}
        references={references}
      />
    );

    expect(wrapper.length).toBe(1);
  });
});
