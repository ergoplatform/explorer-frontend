import * as QRCode from 'qrcode.react';
import * as React from 'react';
import * as ReactModal from 'react-modal';

import { CrossIcon } from '../../common/icons/common.icons';

interface IPaymentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import './payment-request-modal.scss';

export class PaymentRequestModalComponent extends React.PureComponent<IPaymentRequestModalProps> {
  state: any = {
    amount: 0
  };
  
  constructor (props: IPaymentRequestModalProps) {
    super(props);
    
    this.setAmount = this.setAmount.bind(this);
  }
  
  render (): JSX.Element {
    const params = new URLSearchParams();
    
    params.append('amount', this.state.amount);
    
    const link = location.origin + '?' + params.toString();
    
    return (
      <ReactModal className='bi-payment-request-modal bi-modal bi-modal--scale'
                  overlayClassName='bi-modal-overlay'
                  closeTimeoutMS={ 150 }
                  isOpen={ this.props.isOpen }
                  onRequestClose={ this.props.onClose }>
        <button className='bi-modal__btn-close'
                onClick={ this.props.onClose }>
          <CrossIcon className='bi-modal__btn-close-icon'/>
        </button>
        
        <div className='bi-payment-request-modal__title'>
          Create Payment Request
          
          <div className='bi-payment-request-modal__subtitle'>
            Use this form to customize an address for payment request
          </div>
        </div>
        
        <div className='bi-payment-request-modal__form'>
          <input type='number' onChange={ this.setAmount } min={ 0 }/>
        </div>
        
        <QRCode value={ link }
                size={ 164 }/>
        
        { link }
      </ReactModal>
    );
  }
  
  private setAmount (event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      amount: event.target.value
    });
  }
}
