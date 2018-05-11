import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import './data.scss';

import { BlockActions } from '../../actions/block.actions';
import { AppState } from '../../store/app.store';

import BlocksTableComponent from '../../components/blocks-table/blocks-table.component';
import LimitSelectorComponent from '../../components/common/limit-selector/limit-selector.component';
import PaginateComponent from '../../components/common/paginate/paginate.component';

type IDataProps = AppState & BlockActions & RouteComponentProps<{
  pageNumber: number,
}>;

class DataComponent extends React.PureComponent {
  props: IDataProps & InjectedIntlProps;
  
  constructor (props: any) {
    super(props);
    
    this.onPageChange  = this.onPageChange.bind(this);
    this.onLimitSelect = this.onLimitSelect.bind(this);
  }
  
  componentDidMount (): void {
    const pageNumber = this.props.match.params.pageNumber ? (this.props.match.params.pageNumber - 1) : 0;
    
    this.reloadBlocks(pageNumber);
  }
  
  componentWillReceiveProps (props: IDataProps): void {
    if (props.match.params.pageNumber === undefined &&
      (this.props.match.params.pageNumber !== props.match.params.pageNumber)) {
      this.reloadBlocks();
    }
  }
  
  // TODO: add preloader
  render (): JSX.Element {
    return (
      <div className='bi-data g-flex-column'>
        <div className='bi-data__header g-flex'>
          <div className='bi-data__title g-flex__item'>
            { this.props.intl.formatMessage({ id: 'components.data.title' }) }
          </div>
          
          <div className='bi-data__actions g-flex__item-fixed'>
            <LimitSelectorComponent items={ [30, 60, 120] }
                                    selected={ this.props.settings.blocksLimit }
                                    label={ 'Show' }
                                    onLimitSelect={ this.onLimitSelect }/>
          </div>
        </div>
        
        <div className='bi-data__body g-flex-column__item'>
          <BlocksTableComponent blocks={ this.props.blocks.blocks } isFetching={ this.props.blocks.fetching }/>
        </div>
        
        
        <div className='bi-data__footer g-flex-column__item-fixed g-flex'>
          <PaginateComponent limit={ this.props.settings.blocksLimit }
                             total={ this.props.blocks.total }
                             forcePage={ this.props.blocks.offset / this.props.settings.blocksLimit }
                             onPageChange={ this.onPageChange }/>
        </div>
      </div>
    );
  }
  
  
  private onPageChange (page: number): void {
    this.reloadBlocks(page);
  }
  
  private reloadBlocks (page: number = 0, blocksLimit?: number, blocksOffset?: number): void {
    const limit  = blocksLimit || this.props.settings.blocksLimit;
    const offset = blocksOffset || (limit * page);
    
    this.props.getBlocks({
      limit,
      offset
    });
    
    const newPage = Math.ceil(offset / limit);
    
    if (newPage === 0) {
      this.props.history.push(`/`);
    } else {
      this.props.history.push(`/page/${newPage + 1}`);
    }
  }
  
  private onLimitSelect (limit: number): void {
    const pageNumber = this.props.match.params.pageNumber ? (this.props.match.params.pageNumber - 1) : 0;
    
    this.reloadBlocks(pageNumber, limit, this.props.blocks.offset);
  }
}

function mapStateToProps (state: AppState): AppState {
  return state;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(BlockActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl<IDataProps>(DataComponent));
