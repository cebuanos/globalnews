// Global News
// Api key = 4dd4a172bbc049979d83ad8b423ccc34
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneSlider,
  PropertyPaneHorizontalRule,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'GlobalnewsWebPartStrings';
import * as lodash from "lodash";
import Globalnews from './components/Globalnews';
import { IGlobalnewsProps } from './components/IGlobalnewsProps';
import  apiservices  from '../../appservices/base/Apiservices';
import  validation  from '../../appservices/base/Validation';
import { IDropdownOption } from "office-ui-fabric-react";
import { PropertyFieldMultiSelect } from "@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect";
import { ISourceResults } from '../../appservices/interface/ISourceResults';

const languages: IPropertyPaneDropdownOption[] = [
  { key: "all", text: "All Languages" },
  { key: "ar", text: "Arabic" },
  { key: "de", text: "German" },
  { key: "en", text: "English" },
  { key: "es", text: "Castilian" },
  { key: "fr", text: "French" },
  { key: "he", text: "Hebrew" },
  { key: "it", text: "Italian" },
  { key: "nl", text: "Dutch" },
  { key: "no", text: "Norwegian" },
  { key: "pt", text: "Portuguese" },
  { key: "ru", text: "Russian" },
  { key: "se", text: "Northern Sami" },
  { key: "zh", text: "Chinese" }
];


const countries: IPropertyPaneDropdownOption[] = [
  { key: "ALL", text: "All Countries" },
  { key: "AE", text: "United Arab Emirates" },
  { key: "AR", text: "Argentina" },
  { key: "AT", text: "Austria" },
  { key: "AU", text: "Australia" },
  { key: "BE", text: "Belgium" },
  { key: "BG", text: "Bulgaria" },
  { key: "BR", text: "Brazil" },
  { key: "CA", text: "Canada" },
  { key: "CH", text: "Switzerland" },
  { key: "CN", text: "China" },
  { key: "CO", text: "Colombia" },
  { key: "CU", text: "Cuba" },
  { key: "CZ", text: "Czech Republic" },
  { key: "DE", text: "Germany" },
  { key: "EG", text: "Egypt" },
  { key: "FR", text: "France" },
  { key: "GB", text: "United Kingdom" },
  { key: "GR", text: "Greece" },
  { key: "HK", text: "Hong Kong" },
  { key: "HU", text: "Hungary" },
  { key: "ID", text: "Indonesia" },
  { key: "IE", text: "Ireland" },
  { key: "IL", text: "Israel" },
  { key: "IN", text: "India" },
  { key: "IT", text: "Italy" },
  { key: "JP", text: "Japan" },
  { key: "KR", text: "Korea, Republic of" },
  { key: "LT", text: "Lithuania" },
  { key: "LV", text: "Latvia" },
  { key: "MA", text: "Morocco" },
  { key: "MX", text: "Mexico" },
  { key: "MY", text: "Malaysia" },
  { key: "NG", text: "Nigeria" },
  { key: "NL", text: "Netherlands" },
  { key: "NO", text: "Norway" },
  { key: "NZ", text: "New Zealand" },
  { key: "PH", text: "Philippines" },
  { key: "PL", text: "Poland" },
  { key: "PT", text: "Portugal" },
  { key: "RO", text: "Romania" },
  { key: "RS", text: "Serbia" },
  { key: "RU", text: "Russian Federation" },
  { key: "SA", text: "Saudi Arabia" },
  { key: "SE", text: "Sweden" },
  { key: "SG", text: "Singapore" },
  { key: "SI", text: "Slovenia" },
  { key: "SK", text: "Slovakia" },
  { key: "TH", text: "Thailand" },
  { key: "TR", text: "Turkey" },
  { key: "TW", text: "Taiwan, Province of China" },
  { key: "UA", text: "Ukraine" },
  { key: "US", text: "United States" },
  { key: "VE", text: "Venezuela, Bolivarian Republic of" },
  { key: "ZA", text: "South Africa" }
];

const categories: IPropertyPaneDropdownOption[] = [
  { key: "business", text: "business" },
  { key: "entertainment", text: "entertainment" },
  { key: "general", text: "general" },
  { key: "health", text: "health" },
  { key: "science", text: "science" },
  { key: "sports", text: "sports" },
  { key: "technology", text: "technology" }
];

export interface IGlobalnewsWebPartProps {
  title: string;
  newsUrl: string;
  apiKey: string;
  endpoint: number;
  category: string;
  language: string;
  country: string;
  pagesize: number;
  viewOption: string;
  sources: string[];
}


export default class GlobalnewsWebPart extends BaseClientSideWebPart <IGlobalnewsWebPartProps> {

  private _sourcesOptions: IDropdownOption[] = [];

  protected async onInit<T>(): Promise<T>{
    await apiservices.init(this.context);

    return Promise.resolve();
  }

  public updateProperty = (value: string) => {
    this.properties.title = value;
  }

  private _getSources = async (apiKey: string) => {
     let resultSources: ISourceResults = await apiservices.getSources(apiKey);

     try {
       if(resultSources && resultSources.sources.length > 0){
          for (const source of resultSources.sources){
            this._sourcesOptions.push({ key: source.id, text: source.name });
          }
          return;
       }
     } catch(error){
       console.log("Error Loading Sources", error);
       return;
     }
  }
 
  // Render WebPart
  public render(): void {
    const element: React.ReactElement<IGlobalnewsProps> = React.createElement(
      Globalnews,
      {
        title: this.properties.title,
        newsUrl: this.properties.newsUrl,
        apiKey: this.properties.apiKey,
        context: this.context,
        updateProperty: this.updateProperty,
        displayMode: this.displayMode,
        viewOption: this.properties.viewOption,
        pageSize: this.properties.pagesize,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected async onPropertyPaneConfigurationStart() {
    await this._getSources(this.properties.apiKey);
    this.context.propertyPane.refresh();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let _showPropertyCategory: any = "";
    let _showPropertyCountry: any = "";
    let _viewOption: string = undefined;
    let _showPropertyLanguage: any = "";

     if (!this.properties.viewOption || this.properties.viewOption === 'list'){
       _viewOption = "list";
     } else {
       _viewOption = "tiles";
     }

    if (!this.properties.category){
      this.properties.category = "general";
    }

    if (!this.properties.title){
      this.properties.title = "Global News";
    }

    if (!this.properties.apiKey){
      this.properties.apiKey = "4dd4a172bbc049979d83ad8b423ccc34";
    }

    if (!this.properties.endpoint){
      this.properties.endpoint = 1;
    }

    //if All News or TOP Headding news
    switch (this.properties.endpoint) {
      case 2:
        this.properties.country = "";
        this.properties.category = "";
        _showPropertyCountry = "";
        _showPropertyCategory = "";

        this.properties.newsUrl = `https://newsapi.org/v2/top-headlines?sortBy=publishedAt`;

        if (this.properties.pagesize) {
          this.properties.newsUrl = `${this.properties.newsUrl}&pageSize=${this.properties.pagesize}`;
        }

        if (this.properties.sources && this.properties.sources.length > 0) {
          if (this.properties.sources.length < 20) {
              this.properties.newsUrl = `${
              this.properties.newsUrl
            }&sources=${this.properties.sources.join()}`;
          } else {
            this.properties.newsUrl = `${
              this.properties.newsUrl
            }&sources=${this.properties.sources.slice(0, 19).join()}`;
          }
        }

        if(this.properties.language && this.properties.language !== "all"){
          this.properties.newsUrl = `${this.properties.newsUrl}&language=${this.properties.language}`;
        }

        if(this.properties.pagesize){
          this.properties.newsUrl = `${this.properties.newsUrl}&pageSize=${this.properties.pagesize}`;
        }

        if (this.properties.sources && this.properties.sources.length > 0){
           if(this.properties.sources.length < 20){
             this.properties.newsUrl =`${this.properties.newsUrl}&sources=${this.properties.sources.join()}`;
           } else {
             this.properties.newsUrl = `${this.properties.newsUrl}&sources=${this.properties.sources.slice(0, 19).join()}`;
           }
        }

         _showPropertyLanguage = PropertyPaneDropdown("language", {
          label: "Show Articles in this language",
          options: lodash.sortBy(languages, ["key"]),
          selectedKey: this.properties.language || "all"
        });

        break;
      // Top Heading
      case 1:
        // Reset Properties Vars
        this.properties.language = "";
        _showPropertyLanguage = "";

        this.properties.newsUrl = `https://newsapi.org/v2/top-headlines?sortBy=publishedAt`;
        
        if (this.properties.pagesize) {
          this.properties.newsUrl = `${this.properties.newsUrl}&pageSize=${this.properties.pagesize}`;
        }

        // Has sources ? add parameter to newsURl disable country and Category
        if (this.properties.sources && this.properties.sources.length > 0) {
          if (this.properties.sources.length < 20) {
            // only the first 20 sources selectd limited by API
            this.properties.newsUrl = `${
              this.properties.newsUrl
            }&sources=${this.properties.sources.join()}`;
          } else {
            this.properties.newsUrl = `${
              this.properties.newsUrl
            }&sources=${this.properties.sources.slice(0, 19).join()}`;
          }
        } else {
          // Show Category and Country if sources is not specified
          if (this.properties.category) {
            this.properties.newsUrl = `${this.properties.newsUrl}&category=${this.properties.category}`;
          }

          if (this.properties.country && this.properties.country !== "ALL") {
            this.properties.newsUrl = `${this.properties.newsUrl}&country=${this.properties.country}`;
          }

          _showPropertyCountry = PropertyPaneDropdown("country", {
            label: "Country",
            options: lodash.sortBy(countries, ["text"]),
            selectedKey: this.properties.country || "ALL"
          });

          _showPropertyCategory = PropertyPaneDropdown("category", {
            label: "Category",
            options: lodash.sortBy(categories, ["key"]),
            selectedKey: this.properties.category || "general"
          });
        }

        break;
      default:
        break;
    }

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.Title,
                  value: this.properties.title,
                  onGetErrorMessage: validation.validateTitle.bind(this)
                }),
                PropertyPaneTextField('newsUrl', {
                  label: strings.NewsUrl,
                  value: this.properties.newsUrl,
                  onGetErrorMessage: validation.validateNewsUrl.bind(this)
                }),
                PropertyFieldMultiSelect('sources', {
                  key: "sources",
                  label: "sources",
                  disabled: false,
                  options: this._sourcesOptions,
                  selectedKeys: this.properties.sources
                }),
                PropertyPaneChoiceGroup("endpoint", {
                  label: "Show Articles from:",

                  options: [
                    { text: "Top Headlines", key: 1 },
                    { text: "All News", key: 2 }
                  ]
                }),
                _showPropertyCategory,
                _showPropertyCountry,
                _showPropertyLanguage
              ]
            }
          ]
        },
          {
          header: {
            description: strings.ViewSettings
          },
          groups: [
            {
              groupFields: [
                PropertyPaneChoiceGroup('viewOption', {
                  label: strings.ViewOption,
                  options: [
                    {
                      text: "List View",
                      key: "list",
                      checked: _viewOption === "list" ? true : false,
                      iconProps: { officeFabricIconFontName: "list"}
                    },
                    {
                      text: "Tiles View",
                      key: "tiles",
                      checked: _viewOption === "titles" ? true : false,
                      iconProps: { officeFabricIconFontName: "Tiles" }
                    }
                  ]
                }),
                PropertyPaneLabel("", { text: ""}),
                PropertyPaneSlider("pagesize", {
                  label: strings.PageSizeLabel,
                  max: 100,
                  min: 3,
                  step: 1,
                  showValue: true,
                  value: this.properties.pagesize
                }),
                PropertyPaneLabel("", { text: strings.APILabelText}),
                PropertyPaneTextField("apiKey", {
                  label: strings.ApiKey,
                  value: this.properties.apiKey,
                  validateOnFocusOut: true,
                  onGetErrorMessage: validation.validateApiKey.bind(this)
                })
              ]
            }
          ]
        }
      ]
      
    };
  }
}
