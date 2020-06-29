This Web Part Get News from newsapi.org API, please go to https://newsapi.org for more information

There are two main functions of Global News as of the following:

Public View
-----------
1. Search Results News Item
2. Pagination 

Component View Properties
------------------
1. Title 
2. Category 
3. Country
4. ApiURl
5. ApiKey
3. Source
    a. Top headlines
    b. All News
4. View Options
5. Slider Page Size

## global-news-webparts

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
