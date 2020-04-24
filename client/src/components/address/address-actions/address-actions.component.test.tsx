import { ShallowWrapper } from 'enzyme';
import React from 'react';

import { FullAddress } from '../../../models/generated/fullAddress';

import { shallowWithIntl } from '../../../utils/test-utils';
import {
  AddressActionsComponent,
  PAYMENT_REQUEST_MODAL_STATE_KEY,
  QRCODE_MODAL_STATE_KEY,
} from './address-actions.component';

import { AddressQrcodeModalComponent } from '../../modals/address-qrcode-modal/address-qrcode-modal.component';
import { PaymentRequestModalComponent } from '../../modals/payment-request-modal/payment-request-modal.component';

describe('Components | AddressActions', () => {
  let address: FullAddress;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    address = {
      summary: {
        id: 'foo',
      },
      transactions: {
        confirmed: 100,
        confirmedBalance: 100,
        totalReceived: 100,
      },
    };

    wrapper = shallowWithIntl(<AddressActionsComponent address={address} />);
  });

  it('should render without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should change QRCODE_MODAL_STATE_KEY on button click', () => {
    wrapper.find('button').first().simulate('click');

    expect(wrapper.state()[QRCODE_MODAL_STATE_KEY]).toBeTruthy();
  });

  it('should change QRCODE_MODAL_STATE_KEY on QRCode Modal close', () => {
    wrapper.find(AddressQrcodeModalComponent).props().onClose();

    expect(wrapper.state()[QRCODE_MODAL_STATE_KEY]).toBeFalsy();
  });

  it('should change PAYMENT_REQUEST_MODAL_STATE_KEY on button click', () => {
    wrapper.find('button').last().simulate('click');

    expect(wrapper.state()[PAYMENT_REQUEST_MODAL_STATE_KEY]).toBeTruthy();
  });

  it('should change PAYMENT_REQUEST_MODAL_STATE_KEY on QRCode Modal close', () => {
    wrapper.find(PaymentRequestModalComponent).props().onClose();

    expect(wrapper.state()[PAYMENT_REQUEST_MODAL_STATE_KEY]).toBeFalsy();
  });
});
