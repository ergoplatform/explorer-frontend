import React, { useEffect, useMemo } from 'react';
import './rich-list.scss';

import { connect } from 'react-redux';
import { addressesBalancesStructSelector } from 'src/selectors/addresses';
import { AddressActions } from 'src/actions/address.actions';
import { bindActionCreators } from 'redux';
import LoaderLogo from 'src/components/loader/loader';
import formatNumber from 'format-number';
import { Link } from 'react-router-dom';

const RichList = (props: any) => {
  const { addressesBalances, getAddressesBalances } = props;
  console.log(addressesBalances);
  useEffect(() => {
    getAddressesBalances();
  }, []);

  const addresses = useMemo(() => {
    return (
      addressesBalances.data?.items.filter(
        ({ address }: any) =>
          address !==
          '2Z4YBkDsDvQj8BX7xiySFewjitqp2ge9c99jfes2whbtKitZTxdBYqbrVZUvZvKv6aqn9by4kp3LE1c26LCyosFnVnm6b6U1JYvWpYmL2ZnixJbXLjWAWuBThV1D6dLpqZJYQHYDznJCk49g5TUiS4q8khpag2aNmHwREV7JSsypHdHLgJT7MGaw51aJfNubyzSKxZ4AJXFS27EfXwyCLzW1K6GVqwkJtCoPvrcLqmqwacAWJPkmh78nke9H4oT88XmSbRt2n9aWZjosiZCafZ4osUDxmZcc5QVEeTWn8drSraY3eFKe8Mu9MSCcVU'
      ) || []
    );
  }, [addressesBalances.data]);

  if (!addressesBalances?.data?.items) {
    return <LoaderLogo></LoaderLogo>;
  }

  return (
    <div className="rich-list">
      <h1 className="rich-list__title">Rich List</h1>
      <h4 className="rich-list__subtitle">
        Want financial privacy? Use{' '}
        <a
          href="https://github.com/ergoMixer/ergoMixBack"
          target="_blank"
          rel="noreferrer noopener"
        >
          ErgoMixer
        </a>
        !
      </h4>
      <div className="rich-list-table">
        <div className="rich-list-table__body bi-table">
          <div className="rich-list-table-header rich-list-table__row bi-table__row">
            <div className="rich-list-table__cell bi-table__cell">Rank</div>

            <div className="rich-list-table__cell bi-table__cell">Quantity</div>

            <div className="rich-list-table__cell bi-table__cell">Address</div>
          </div>

          {addresses.map((item: any, i: number) => {
            return (
              <Link
                className="rich-list-table__row bi-table__row"
                key={i + 1}
                to={`/addresses/${item.address}`}
              >
                <div className="rich-list-table__cell bi-table__cell bi-tokens-table__cell">
                  <div className="rich-list-table__cell-name bi-tokens-table__cell-name">
                    Rank
                  </div>

                  {i + 1}
                </div>

                <div className="rich-list-table__cell bi-table__cell  bi-tokens-table__cell">
                  <div className="rich-list-table__cell-name bi-tokens-table__cell-name">
                    Quantity
                  </div>
                  <span>
                    {formatNumber({
                      integerSeparator: ',',
                    })(Number(String(item.balance / 1000000000).split('.')[0]))}
                    <span className="text-gray">
                      .
                      {formatNumber({
                        integerSeparator: '',
                      })(
                        Number(
                          String(item.balance / 1000000000).split('.')[1] || 0
                        )
                      )}
                    </span>
                    &nbsp;ERG
                  </span>
                </div>

                <div className="rich-list-table__cell bi-table__cell bi-tokens-table__cell">
                  <div className="rich-list-table__cell-name bi-tokens-table__cell-name">
                    Address
                  </div>

                  {item.address.slice(0, 8)}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  addressesBalances: addressesBalancesStructSelector(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ ...AddressActions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RichList);
