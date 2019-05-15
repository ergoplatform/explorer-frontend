import * as QRCode from 'qrcode.react';
import * as queryString from 'query-string';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';

import environment from '../../config/environment';

type IPaymentRequestProps = RouteComponentProps<any>;

import './payment-request.scss';

export class PaymentRequestComponent extends React.PureComponent<IPaymentRequestProps> {
  input: HTMLDivElement;
  
  state: any = {
    copied: false
  };
  
  constructor (props: IPaymentRequestProps) {
    super(props);
    
    this.copyAddressToClipboard = this.copyAddressToClipboard.bind(this);
  }
  
  render (): JSX.Element {
    const { address, amount, description }: any = queryString.parse(this.props.location.search);
    
    return (
      <div className='bi-payment-request'>
        <div className='bi-payment-request__header'>
          <div className='bi-payment-request__title'>
            <FormattedMessage id='components.payment-request.title'/>
            
            <div className='bi-payment-request__subtitle'>
              <FormattedMessage id='components.payment-request.subtitle' values={ {
                coinName: environment.blockchain.coinName.toUpperCase()
              } }/>
            </div>
          </div>
        </div>
        
        <div className='bi-payment-request__body'>
          { (amount > 0 || description) && (
            <div className='bi-payment-request__info'>
              { amount > 0 && (
                <div className='bi-payment-request__amount'>
                  { amount } { environment.blockchain.coinName.toUpperCase() }
                </div>
              ) }
              { description && (
                <div className='bi-payment-request__description'>
                  <FormattedMessage id='components.payment-request.for'/> <cite>«{ description }»</cite>
                </div>
              ) }
            </div>
          ) }
          <QRCode value={ address } size={ 146 }/>
          
          <div className='bi-payment-request__address g-flex'>
            <div className='bi-payment-request__input g-flex__item'
                 ref={ (ref: HTMLDivElement) => this.input = ref }>
              { address }
            </div>
            
            <button className='bi-payment-request__btn-copy g-flex__item-fixed'
                    onClick={ this.copyAddressToClipboard }>
              {
                this.state.copied ?
                  <FormattedMessage id='components.payment-request.copied'/> :
                  <FormattedMessage id='components.payment-request.copy'/>
              }
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  private selectInput (): void {
    (window.getSelection() as Selection)
    .selectAllChildren(this.input);
  }
  
  private copyAddressToClipboard (): void {
    this.selectInput();
    
    document.execCommand('copy');
    (window.getSelection() as Selection)
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
