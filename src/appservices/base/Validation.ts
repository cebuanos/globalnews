export default class validation {

  public static validateTitle = (value: string): string => {
    try {
      if (value === null || value.trim().length === 0) {
        return 'Provide a title';
      }
      if (value.length > 40){
        return 'Description should be longer than 40 charaters';
      }

      return '';

    } catch (error){
       return 'title is not valid, please specify a valid title';
    }
  }

  public static validateApiKey = (value: string): string => {
    try{
      if (value === null || value.trim().length === 0){
        return 'Provide a Api Key';
      }
    } catch(error){
      return 'Api Key is not valid, please specify a valid api key';
    }
  }

  public static validateNewsUrl = (value: string): string => {
    try{
      let _url = new URL(value);
      
      return "";
    } catch(error){
      return "news Url is not valid, please specify valid url";
    }
  }
  
}