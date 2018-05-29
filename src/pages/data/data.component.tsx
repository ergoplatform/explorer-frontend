import * as queryString from 'query-string';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import './data.scss';

import { BlockActions } from '../../actions/block.actions';
import { AppState } from '../../store/app.store';

import { BlocksTableComponent } from '../../components/blocks-table/blocks-table.component';
import { LimitSelectorComponent } from '../../components/common/limit-selector/limit-selector.component';
import { PaginateSimpleComponent } from '../../components/common/paginate-simple/paginate-simple.component';

type IDataProps = AppState & BlockActions & RouteComponentProps<{}>;

class Data extends React.PureComponent {
  props: IDataProps;
  offset: number;
  
  constructor (props: any) {
    super(props);
    
    this.onPageChange  = this.onPageChange.bind(this);
    this.onLimitSelect = this.onLimitSelect.bind(this);
  }
  
  componentDidMount (): void {
    this.offset = this.getOffset();
    
    this.reloadBlocks(this.offset);
  }
  
  componentWillReceiveProps (props: IDataProps): void {
    const offset = this.getOffset();
    
    if (offset === undefined && (this.offset !== offset)) {
      this.offset = this.getOffset();
      
      this.reloadBlocks(this.offset);
    }
  }
  
  // TODO: add preloader
  render (): JSX.Element {
    return (
      <div className='bi-data g-flex-column g-flex-column__item'>
        <div className='bi-data__header g-flex'>
          <div className='bi-data__title g-flex__item'>
            <FormattedMessage id='components.data.title'/>
          </div>
        </div>
        
        <div className='bi-data__body g-flex-column__item g-scroll-y'>
          <BlocksTableComponent blocks={ this.props.blocks.blocks } isFetching={ this.props.blocks.fetching }/>
        </div>
        
        
        <div className='bi-data__footer g-flex-column__item-fixed g-flex'>
          <div className='g-flex__item-fixed'>
            <LimitSelectorComponent items={ [30, 60, 120] }
                                    selected={ this.props.settings.blocksLimit }
                                    label={ <FormattedMessage id='components.data.title'/> }
                                    onLimitSelect={ this.onLimitSelect }/>
          </div>
          
          <div className='g-flex__item-fixed'>
            <PaginateSimpleComponent total={ this.props.blocks.total }
                                     limit={ this.props.settings.blocksLimit }
                                     forcePage={ Math.floor(this.props.blocks.offset / this.props.settings.blocksLimit) }
                                     onPageChange={ this.onPageChange }/>
          </div>
        </div>
      </div>
    );
  }
  
  
  private onPageChange (page: number): void {
    this.reloadBlocks(page * this.props.settings.blocksLimit);
  }
  
  private reloadBlocks (blocksOffset: number = 0, blocksLimit?: number): void {
    const limit = blocksLimit || this.props.settings.blocksLimit;
    
    this.props.getBlocks({
      limit,
      offset: blocksOffset
    });
    
    if (blocksOffset === 0) {
      this.props.history.push(`/`);
    } else {
      this.props.history.push(`/?offset=${blocksOffset}`);
    }
  }
  
  private onLimitSelect (limit: number): void {
    this.reloadBlocks(this.props.blocks.offset, limit);
  }
  
  private getOffset (): number {
    let { offset } = queryString.parse(this.props.history.location.search);
    
    offset = parseInt(offset, 10);
    
    if (!offset) {
      return 0;
    } else {
      return offset;
    }
  }
}

function mapStateToProps (state: AppState): AppState {
  return state;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(BlockActions, dispatch);
}

export const DataComponent = connect(mapStateToProps, mapDispatchToProps)(Data);
