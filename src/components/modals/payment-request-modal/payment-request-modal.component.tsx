import * as QRCode from 'qrcode.react';
import * as queryString from 'query-string';
import * as React from 'react';
import * as ReactModal from 'react-modal';

import { AddressId } from '../../../models/generated/addressId';

import { CrossIcon } from '../../common/icons/common.icons';

interface IPaymentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: AddressId;
}

import './payment-request-modal.scss';

export class PaymentRequestModalComponent extends React.PureComponent<IPaymentRequestModalProps> {
  link: HTMLDivElement;
  
  state: any = {
    amount: 0,
    copied: false,
    description: ''
  };
  
  constructor (props: IPaymentRequestModalProps) {
    super(props);
    
    this.setAmount           = this.setAmount.bind(this);
    this.setDescription      = this.setDescription.bind(this);
    this.copyLinkToClipboard = this.copyLinkToClipboard.bind(this);
    this.selectLink          = this.selectLink.bind(this);
  }
  
  render (): JSX.Element {
    const link = this.getLink();
    
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
          <label className='bi-payment-request-modal__form-item g-flex'>
            <span className='bi-payment-request-modal__label g-flex__item-fixed'>
              Amount
            </span>
            
            <div className='bi-payment-request-modal__input-wrapper g-flex__item'>
              <input className='bi-payment-request-modal__input'
                     type='number'
                     onChange={ this.setAmount }
                     min={ 0 }/>
              
              <span className='bi-payment-request-modal__input-currency'>ERGO</span>
            </div>
          </label>
          
          <label className='bi-payment-request-modal__form-item g-flex'>
            <span className='bi-payment-request-modal__label bi-payment-request-modal__label--line'>
              Description
            </span>
            
            <div className='bi-payment-request-modal__input-wrapper g-flex__item'>
              <textarea className='bi-payment-request-modal__input bi-payment-request-modal__input--textarea'
                        onChange={ this.setDescription }/>
            </div>
          </label>
        </div>
        
        <div className='g-flex'>
          <div className='g-flex__item-fixed'>
            <QRCode value={ link }
                    size={ 148 }/>
          </div>
          
          <div className='g-flex__item-fixed bi-payment-request-modal__link g-flex-column'>
            <div className='bi-payment-request-modal__link-header g-flex-column__item-fixed'>
              Payment Request Link:
            </div>
            
            <div className='bi-payment-request-modal__link-body u-word-wrap g-scroll-y g-flex-column__item-fixed'
                 onClick={ this.selectLink }
                 ref={ (ref: HTMLDivElement) => this.link = ref }>
              { link }
            </div>
            
            <div className='bi-payment-request-modal__link-footer g-flex-column__item g-flex'>
              <button className='bi-payment-request-modal__btn-copy bi-btn bi-btn--flat'
                      onClick={ this.copyLinkToClipboard }>
                { this.state.copied ? 'Copied!' : 'Copy Link' }
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
  
  private getLink (): string {
    const params = queryString.stringify({
      address: this.props.address,
      amount: this.state.amount,
      description: this.state.description
    });
    
    return `${location.origin}/payment-request?${params}`;
  }
  
  private setAmount (event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      amount: event.target.value
    });
  }
  
  private setDescription (event: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({
      description: event.target.value
    });
  }
  
  private selectLink (): void {
    window.getSelection()
      .selectAllChildren(this.link);
  }
  
  private copyLinkToClipboard (): void {
    this.selectLink();
    
    document.execCommand('copy');
    window.getSelection()
      .removeAllRanges();
    
    this.setState({
      copied: true
    });
    
    setTimeout(() => {
      this.setState({
        copied: false
      });
    }, 1000);
  }
}

