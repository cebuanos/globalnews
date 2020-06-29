import { IArticle } from "../../../appservices/interface/IArticle";

export interface IGlobalnewsState {
  hasError:boolean;
  articles: IArticle[];
  errorMessage:string;
  isLoading: boolean;
  currentPage:number;
  totalPages:number;
}
