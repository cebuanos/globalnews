import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface IGlobalnewsProps {
  title: string;
  newsUrl: string;
  apiKey: string;
  context: WebPartContext;
  updateProperty: (value: string) => void;
  displayMode: DisplayMode;
  viewOption: string;
  pageSize: number;

}
