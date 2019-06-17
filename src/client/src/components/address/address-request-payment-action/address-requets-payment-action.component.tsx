import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { FullAddress } from '../../../models/generated/fullAddress';

import { PaymentRequestModalComponent } from '../../modals/payment-request-modal/payment-request-modal.component';

import '../address-actions/address-actions.scss';

interface IAddressActionsState {
  [key: string]: boolean;
}

interface IAddressActionsProps {
  address: FullAddress;
}

export const PAYMENT_REQUEST_MODAL_STATE_KEY = 'isPaymentRequestModalOpened';

export class AddressRequetsPaymentActionComponent extends React.Component<IAddressActionsProps, IAddressActionsState> {
  state: IAddressActionsState = {
    [PAYMENT_REQUEST_MODAL_STATE_KEY]: false,
  };
  
  constructor (props: IAddressActionsProps) {
    super(props);
    
    this.openModal  = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-address-actions g-flex'>
        <div className='bi-address-actions__item g-flex__item-fixed'>
          <button className='bi-address-actions__btn'
                  onClick={ this.openModal(PAYMENT_REQUEST_MODAL_STATE_KEY) }>
            <FormattedMessage id='components.address-actions.request-payment'/>
          </button>
        </div>
        
        <PaymentRequestModalComponent isOpen={ this.state[PAYMENT_REQUEST_MODAL_STATE_KEY] }
                                      onClose={ this.closeModal(PAYMENT_REQUEST_MODAL_STATE_KEY) }
                                      address={ this.props.address.summary.id }/>
      </div>
    );
  }
  
  private openModal (stateKey: string): () => void {
    return () => {
      this.setState({
        [stateKey]: true
      });
    };
  }
  
  private closeModal (stateKey: string): () => void {
    return () => {
      this.setState({
        [stateKey]: false
      });
    };
  }
}
