import * as React from 'react';

import { FullAddress } from '../../../models/generated/fullAddress';

import { QRCodeIcon } from '../../common/icons/common.icons';
import { AddressQrcodeModalComponent } from '../../modals/address-qrcode-modal/address-qrcode-modal.component';

import './address-actions.scss';

interface IAddressActionsState {
  isQrCodeModalOpened: boolean;
}

interface IAddressActionsProps {
  address: FullAddress;
}

export class AddressActionsComponent extends React.PureComponent<IAddressActionsProps, IAddressActionsState> {
  state: IAddressActionsState = {
    isQrCodeModalOpened: false
  };
  
  constructor (props: IAddressActionsProps) {
    super(props);
    
    this.openQRCodeModal = this.openQRCodeModal.bind(this);
    this.closeQRCodeModal = this.closeQRCodeModal.bind(this);
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-address-actions'>
        <div className='bi-address-actions__item'>
          <button className='bi-address-actions__btn bi-btn'
                  onClick={ this.openQRCodeModal }>
            QR Code
            
            <QRCodeIcon className='bi-address-actions__btn-icon'/>
          </button>
        </div>
        
        <AddressQrcodeModalComponent isOpen={ this.state.isQrCodeModalOpened }
                                     onClose={ this.closeQRCodeModal }
                                     address={ this.props.address.summary.id }/>
      </div>
    );
  }
  
  private openQRCodeModal (): void {
    this.setState({
      isQrCodeModalOpened: true
    });
  }
  
  private closeQRCodeModal (): void {
    this.setState({
      isQrCodeModalOpened: false
    });
  }
}
