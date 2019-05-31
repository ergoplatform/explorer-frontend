import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FullBlock } from '../../../models/generated/fullBlock';


interface IBlockExtProps {
  block: FullBlock;
}

import './block-extension.scss';

export class BlockExtensionComponent extends React.Component<IBlockExtProps> {
  render (): JSX.Element {
    const mockData = [
      [
          "0100",
          "019bbcdbce2f8859c1930dd2ccf6f887def1b82a67d9b4d09469b6826017126306"
      ],
      [
          "0101",
          "036671ef4fa5b22c17e315993fb475ab2c04db4257d28ea0fba72b89a66642cc7e"
      ],
      [
          "0104",
          "0169a56ddad96d16c94536792ba8996aeb33b99b4f78b4105808b49bfb1c18a1a4"
      ],
      [
          "0105",
          "016916e17b0d936746e205857b0785f3290b123c87ea91db6e9c6194493fe3a068"
      ],
      [
          "0106",
          "03a3d52ce6b8deb4dc389567b64109357a06166fd253c55c9dd08ddf8f1294b872"
      ],
      [
          "0109",
          "010190195169cc4784492d342a47d2dc55d7f3d31444bd15577b12877b8b2dc7f9"
      ],
      [
          "010a",
          "0144b079fe6a52c3cda901d7776443906d9860b8625b21c05639656903ece7e7ce"
      ],
      [
          "010b",
          "016d8b09d3ba10f4df1d9d446ab91e2c1287db8115d96e7af19606430f461a0165"
      ],
      [
          "010c",
          "01aabbc9b7c900b5d3417934745a56cb6a7c27ae39227a394db75d82c9e648423c"
      ],
      [
          "010d",
          "03958ce255e758e4f234d38ccde55266e44cc80f7de97159a07bc1003f219c66c1"
      ]
    ];

    return (
      <div className='bi-block-ext'>
        <div className='bi-block-ext__table bi-table'>
          <div className='bi-block-ext__row bi-table__row'>
            <div className='bi-block-ext__cell bi-block-ext__cell--header bi-table__cell'>
              <FormattedMessage id='common.block.headerId'/>
            </div>

            <div className='bi-block-ext__cell bi-table__cell'>
              32dd600d489b59772676a86d5a73a818b05195a59eb1cd0ff35ed31b0a24e406
            </div>
          </div>
          <div className='bi-block-ext__row bi-table__row'>
            <div className='bi-block-ext__cell bi-block-ext__cell--header bi-table__cell'>
              <FormattedMessage id='common.block.digest'/>
            </div>

            <div className='bi-block-ext__cell bi-table__cell'>
              57a146e80508ad6ee766eaf42372b6c9902252cd97797251f26a5129747097b1
            </div>
          </div>
          <div className='bi-block-ext__row bi-table__row'>
            <div className='bi-block-ext__cell bi-block-ext__cell--header bi-table__cell'>
              <FormattedMessage id='common.block.fields'/>
            </div>

            <div className='bi-block-ext__cell bi-table__cell'>
                {mockData.map((i) => <div key={i[0]}>
                    <b>{i[0]}</b>: {i[1]}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
