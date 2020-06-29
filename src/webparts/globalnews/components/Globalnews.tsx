import * as React from 'react';
import * as moment from 'moment';
import styles from './Globalnews.module.scss';
import { IGlobalnewsProps } from './IGlobalnewsProps';
import { IGlobalnewsState } from './IGlobalnewsState';
import  apiservices  from '../../../appservices/base/Apiservices';
import { GlobalnewsTile } from './GlobalnewsTile/GlobalnewsTile';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as strings from 'GlobalnewsWebPartStrings';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  mergeStyles
} from "office-ui-fabric-react";
import Pagination from "@material-ui/lab/Pagination";
import { INewsResults } from "../../../appservices/interface/INewsResults";
import { IArticle } from "../../../appservices/interface/IArticle";
import { Customizer } from "@uifabric/utilities/lib/";

//function call
const alertClicked = (): void => {
  alert('Clicked');
};


export default class Globalnews extends React.Component<IGlobalnewsProps, IGlobalnewsState> {
  private _totalResuts: number = 0;
  
  constructor(props: IGlobalnewsProps) {
    super(props);

    this.state = {
      isLoading: false,
      hasError: false,
      errorMessage: null,
      articles: [],
      currentPage: 1,
      totalPages: 0
    };
  }

  private _onConfigure = () => {
  this.props.context.propertyPane.open();
  }

  //Component Did Mount
  public async componentDidMount(): Promise<void> {
    this._getNews(
      this.props.newsUrl,
      this.props.apiKey,
      this.state.currentPage,
    );

  }

  // Component Did Update
  public async componentDidUpdate(prevProps: IGlobalnewsProps, preState: IGlobalnewsState): Promise<void>
  {
    if (
      this.props.newsUrl !== prevProps.newsUrl ||
      this.props.apiKey !== prevProps.apiKey
    ){
      this._getNews(
        this.props.newsUrl, 
        this.props.apiKey, 
        1
        );
    }
  }

  // Get News from newsApi.org
  private _getNews = async (newsUrl: string, apiKey: string, page?: number) => {
    try {

      const { pageSize } = this.props;
      this.setState({ isLoading: true, hasError: false, errorMessage: "" });
      const results: any = await apiservices.getNews(newsUrl, apiKey, page);

      if (results && results.status == "error") {
        throw new Error(results.message);
      }

      // calculate number of pages
      let _reminder: number = (results as INewsResults).totalResults % pageSize; // get Reminder
      _reminder = _reminder ? 1 : 0;
      const _totalPages: number =
        parseInt((results.totalResults / pageSize).toString()) + _reminder;

      this.setState({
        articles: results ? results.articles : [],
        isLoading: false,
        hasError: false,
        errorMessage: "",
        totalPages: _totalPages,
        currentPage: page
      });
    } catch (error) {
        console.log("error", error);
        this.setState({
        isLoading: false,
        hasError: true,
        errorMessage: error.message
      });
    }
  }

  //Render WebPart
  public render(): React.ReactElement<IGlobalnewsProps> {
    const { hasError, isLoading, articles, errorMessage } = this.state;

    return (    
    <Customizer>
      <div className={styles.globalnews}> 

      {!this.props.apiKey || !this.props.newsUrl ? (
          <Placeholder 
            iconName="Edit"
            iconText={strings.ConfigureWebPartMessage}
            description={strings.ConfigureWebPartTextMessage}
            buttonLabel={strings.ConfigureWebPartButtonLabel}
            onConfigure={this._onConfigure}
          />
        ) : (
          <>
          <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          className={styles.title}
          updateProperty={this.props.updateProperty}
          />
          {isLoading ? (
            <Spinner size={SpinnerSize.medium} label="Loading..." />
          ) : hasError ? (
            <>
              <MessageBar messageBarType={MessageBarType.error}>
              {errorMessage}
              </MessageBar>
            </>
          ) : articles && articles.length > 0 ? (
            <>
            <div className={styles.cardsTiles}>
               {articles.map(article => {
                 return(
                   <GlobalnewsTile article={article} key={article.title} />
                 );
               })}
            </div>
            <div className={styles.pagination} >                 
                    {this.state.totalPages > 1 && (
                      <>
                        <Pagination
                          color="secondary"
                          count={this.state.totalPages}
                          page={this.state.currentPage}
                          onChange={(event, page) => {
                            this._getNews(
                              this.props.newsUrl,
                              this.props.apiKey,
                              page
                            );
                          }}
                        />
                      </>
                    )}
            </div>
            </>
          ) : (
            <div>No News Record found.</div>
          )}
          </>
        )}
      </div>
    </Customizer>
    );
  }
}

