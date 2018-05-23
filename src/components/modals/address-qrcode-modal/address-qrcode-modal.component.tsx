import * as QRCode from 'qrcode.react';
import * as React from 'react';
import * as ReactModal from 'react-modal';

import { AddressId } from '../../../models/generated/addressId';

import { CrossIcon } from '../../common/icons/common.icons';

interface IAddressQrcodeModalProps {
  isOpen: boolean;
  address: AddressId;
  onClose: () => void;
}

import './address-qrcode-modal.scss';

export class AddressQrcodeModalComponent extends React.PureComponent<IAddressQrcodeModalProps> {
  render (): JSX.Element {
    return (
      <ReactModal className='bi-address-qrcode-modal bi-modal bi-modal--scale'
                  overlayClassName='bi-modal-overlay'
                  closeTimeoutMS={ 150 }
                  isOpen={ this.props.isOpen }
                  onRequestClose={ this.props.onClose }>
        <button className='bi-modal__btn-close'
                onClick={ this.props.onClose }>
          <CrossIcon className='bi-modal__btn-close-icon'/>
        </button>
        
        <div className='bi-address-qrcode-modal__title'>
          QR Code
          
          <div className='bi-address-qrcode-modal__subtitle'>
            Scan for Address
          </div>
        </div>
        
        <QRCode value={ this.props.address }
                size={ 164 }/>
      </ReactModal>
    );
  }
}
