import * as queryString from 'query-string';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import './data.scss';

import { AppActions } from '../../actions/app.actions';
import { BlockActions } from '../../actions/block.actions';
import { AppState } from '../../store/app.store';

import { IGetBlocksParams } from '../../services/block.api.service';

import { BlocksTableComponent } from '../../components/blocks-table/blocks-table.component';
import { CalendarComponent } from '../../components/common/calendar/calendar.component';
import { LimitSelectorComponent } from '../../components/common/limit-selector/limit-selector.component';
import { PaginateSimpleComponent } from '../../components/common/paginate-simple/paginate-simple.component';

type IDataProps = AppState & BlockActions & RouteComponentProps<{}> & AppActions;

class Data extends React.PureComponent {
  props: IDataProps;
  params: IGetBlocksParams;
  
  constructor (props: any) {
    super(props);
    
    this.onPageChange  = this.onPageChange.bind(this);
    this.onDateChange  = this.onDateChange.bind(this);
    this.onLimitSelect = this.onLimitSelect.bind(this);
    
    this.params = this.getParams();
  }
  
  componentDidMount (): void {
    if (this.props.blocks.preloaded) {
      this.props.clearPreloadedState();
      
      return;
    }
    
    this.reloadBlocks(this.params);
  }
  
  componentWillReceiveProps (props: IDataProps): void {
    const params = this.getParams();
    
    if (JSON.stringify(params) !== JSON.stringify(this.params)) {
      this.params = params;
      
      this.reloadBlocks(this.params);
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
          
          <div className='bi-data__filters g-flex__item-fixed'>
            <CalendarComponent onChange={ this.onDateChange }
                               startDate={ this.params.startDate }
                               endDate={ this.params.endDate }/>
          </div>
        </div>
        
        <div className='bi-data__body g-flex-column__item g-scroll-y'>
          <BlocksTableComponent blocks={ this.props.blocks.blocks } isFetching={ this.props.blocks.fetching }/>
        </div>
        
        
        <div className='bi-data__footer g-flex-column__item-fixed g-flex'>
          <div className='g-flex__item-fixed'>
            <LimitSelectorComponent items={ [30, 60, 120] }
                                    selected={ this.props.settings.blocksLimit }
                                    label={ <FormattedMessage id='components.data.show'/> }
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
  
  private onDateChange (dateStart: number, dateEnd: number): void {
    this.reloadBlocks({
      endDate: dateEnd,
      startDate: dateStart
    });
  }
  
  
  private onPageChange (page: number): void {
    this.params.offset = page * this.props.settings.blocksLimit;
    
    this.reloadBlocks({ offset: page * this.props.settings.blocksLimit });
  }
  
  private reloadBlocks (params: IGetBlocksParams): void {
    params = {
      ...this.params,
      ...params,
      limit: params.limit || this.props.settings.blocksLimit,
      offset: params.offset || 0
    };
    
    Object.keys(params)
      .forEach((key) => {
        if (params[key] === null) {
          delete params[key];
        }
      });
    
    this.props.getBlocks(params);
    
    
    if (params.offset === 0) {
      delete params.offset;
    }
    
    delete params.limit;
    
    this.props.history.push(`/?${queryString.stringify(params)}`);
  }
  
  private onLimitSelect (limit: number): void {
    this.reloadBlocks({ offset: this.props.blocks.offset, limit });
  }
  
  private getParams (): any {
    let { offset, sortBy, sortDirection, startDate, endDate } = queryString.parse(this.props.history.location.search);
    
    offset        = parseInt(offset, 10);
    startDate     = parseInt(startDate, 10) || null;
    endDate       = parseInt(endDate, 10) || null;
    sortDirection = ['asc', 'desc'].includes(sortDirection) ? sortDirection : null;
    sortBy        = ['height', 'timestamp', 'miner', 'transactionsCount', 'size', 'votes'].includes(sortBy) ? sortBy : null;
    
    return {
      endDate,
      offset: offset || 0,
      sortBy,
      sortDirection,
      startDate
    };
  }
}

function mapStateToProps (state: AppState): AppState {
  return state;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators({...BlockActions, ...AppActions}, dispatch);
}

export const DataComponent = connect(mapStateToProps, mapDispatchToProps)(Data);
