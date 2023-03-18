import React, { useState } from 'react';
import {
  CopyIcon,
  RemoveIcon,
} from '../../../../components/common/icons/common.icons';
import cn from 'classnames';
import './oracle-table.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAlert } from 'react-alert';

// interface Props {
//   name: string;
//   data: [{ name: string; value: any }];
// }

const OracleTableItem = ({ name, value }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const alert = useAlert();

  return (
    <div className="oracle-table__item">
      <div
        className={cn('oracle-table-item-header', {
          'oracle-table-item-header--opened': isOpen,
        })}
      >
        <div className="oracle-table-item-header__title">{name}</div>
        <div className="oracle-table-item-header__right-side">
          <CopyToClipboard text={value}>
            <button
              className="oracle-table-item-header__copy"
              onClick={() => {
                alert.show(
                  <span style={{ textTransform: 'initial' }}>Copied</span>
                );
              }}
            >
              <CopyIcon />
            </button>
          </CopyToClipboard>

          {!isOpen && (
            <div className="oracle-table-item-header__opacity-paragraph">
              {value}
            </div>
          )}

          <a
            className="oracle-table-item-header__link"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {!isOpen && 'More'}
            {isOpen && <RemoveIcon />}
          </a>
        </div>
      </div>
      {!isOpen && (
        <div className="oracle-table-item-body oracle-table-item-body--mobile">
          {value}
        </div>
      )}
      {isOpen && <div className="oracle-table-item-body">{value}</div>}
    </div>
  );
};

const OracleTable = (props: any) => {
  const {
    name,
    data = [{ name: 'Latest data pool', value: '12312123312312132' }],
  } = props;

  return (
    <div className="oracle-table">
      <div className="oracle-table__header">
        <h2 className="oracle-table__title">{name}</h2>
      </div>
      <div className="oracle-table__body">
        {data.map((item: any) => (
          <OracleTableItem
            key={item.name}
            name={item.name}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
};

export default OracleTable;
