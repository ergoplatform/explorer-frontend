import QRCode from 'qrcode.react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactModal from 'react-modal';

import { AddressId } from '../../../models/generated/addressId';

import { CrossIcon } from '../../common/icons/common.icons';

import './address-qrcode-modal.scss';

interface AddressQrcodeModalProps {
  isOpen: boolean;
  address: AddressId;
  onClose: () => void;
}

export class AddressQrcodeModalComponent extends React.PureComponent<AddressQrcodeModalProps> {
  render(): JSX.Element {
    return (
      <ReactModal
        className="bi-address-qrcode-modal bi-modal bi-modal--scale"
        overlayClassName="bi-modal-overlay"
        closeTimeoutMS={150}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
      >
        <button className="bi-modal__btn-close" onClick={this.props.onClose}>
          <CrossIcon className="bi-modal__btn-close-icon" />
        </button>

        <div className="bi-address-qrcode-modal__title">
          <FormattedMessage id="components.address-qr-code-modal.title" />

          <div className="bi-address-qrcode-modal__subtitle">
            <FormattedMessage id="components.address-qr-code-modal.subtitle" />
          </div>
        </div>

        <QRCode value={this.props.address} size={164} />
      </ReactModal>
    );
  }
}
