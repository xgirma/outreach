# outreach-admin


Church info: 
name, address, phone

Intro:

Services: 
ሥርዓተ ቅዳሴ
ክርስትና
ቁርባን
ንስሐ
ሥርዓተ ጋብቻ
ቀንዲል
ጸሎተ ፍትሐት

Blog

- best way to handle mongobd failed to connect to server [localhost:27017] 

- doc on how to open swagger.

- end of the stream or a document separator is expected: swagger search error for 'enum' types

- investigate "husky > npm run -s postcommit (node v9.4.0), fatal: Not a git repository: '.git' "

- improve logging more

- as per rising stack recommendation, keep winston log-level inside env file

- add updated by to all api updates for accountability user -> update (https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/)

- test localhost:3005/api/v1info/2

- remove Boom

- https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml

- JSON API ERROR object

- http://jsonapi.org/format/#error-objects
    

{"errors":[{"code":215,"message":"Bad Authentication data."}]}

- need to write mongoose without callback :)

- watch webpack video

+ pkill mongod

+ error handling fro query methods, now all return 500. Sad.

- https://stmaryeotctoronto.com/am/fast-feasts/

- check if you can transport morgan and stop using winston

- https://facebook.github.io/jest/docs/en/mongodb.html --detectOpenHandles

- user either error or err, not both.

0 https://stmaryeotctoronto.com/en/serve-with-us/ add this page

- http://msmedhanealem.org/service.html

        The Divine Liturgy
        Christening
        Holy Matrimony
        Requiem
        Preaching
        Se’atat, the Horologium
        Mahelet
        
-  http://www.ethiopianorthodox.org/english/ethiopian/worship.html

- add abstraction to integration test as well

- https://www.npmjs.com/package/react-player#standalone-player

- https://docs.videojs.com/tutorial-react.html

- https://github.com/videojs/video.js

- https://www.npmjs.com/package/react-player *** only 3 issues

- media: url, type, tag

- submit blog-post (for a registered user) 

 inside env file

- app.use(cors());

- https://github.com/cocur/slugify

- update winston transport acc to the error template

- add test for user

- double check error handling for user

- add .github (https://github.com/xgirma/latex-javaScript)

- authorisation in ExpressJS

- add timestamp fpr all models

- https://swagger.io/docs/specification/using-ref/ to split swagger doc

- Role based Access Control
    1. only an supper-admin can create admin
    2. ...

"createdAt": "",
            "updatedAt": "",
            
When you boil it down, there are really only 3 outcomes in the interaction between an app and an API:

Everything worked
The application did something wrong
The API did something wrong
Start by using the following 3 codes. If you need more, add them. But you shouldn't go beyond 8.

200 - OK
404 - Not Found
500 - Internal Server Error
If you're not comfortable reducing all your error conditions to these 3, try picking among these additional 5:

201 - Created
304 - Not Modified
400 - Bad Request
401 - Unauthorized
403 - Forbidden
https://apigee.com/about/blog/technology/restful-api-design-what-about-errors

REST Best Practices: 

1. Use nouns but no verbs TODO: update all
2. GET method and query parameters should not alter the state
3. Use plural nouns
4. Use sub-resources for relations
5. Use HTTP headers for serialization formats
6. Use HATEOAS
7. Provide filtering, sorting, field selection and paging for collections
8. Version your API
9. Handle Errors with HTTP status codes

200 – OK – Eyerything is working
201 – OK – New resource has been created
204 – OK – The resource was successfully deleted

304 – Not Modified – The client can use cached data

400 – Bad Request – The request was invalid or cannot be served. The exact error should be explained in the error payload. E.g. „The JSON is not valid“
401 – Unauthorized – The request requires an user authentication
403 – Forbidden – The server understood the request, but is refusing it or the access is not allowed.
404 – Not found – There is no resource behind the URI.
422 – Unprocessable Entity – Should be used if the server cannot process the enitity, e.g. if an image cannot be formatted or mandatory fields are missing in the payload.

10. Allow overriding HTTP method
Some proxies support only POST and GET methods. To support a RESTful API with these limitations, the API needs a way to override the HTTP method.

Use the custom HTTP Header X-HTTP-Method-Override to overrider the POST Method.

- write test for method-override (https://github.com/expressjs/method-override DELETE & PUT)

https://goldbergyoni.com/checklist-best-practices-of-node-js-error-handling/

TEST - DROP-DB - END-POINT - DOCUMENT-FUNCTION - SWAGGER - ADD-ERROR-CONDITIONS 

TODO remove testPathIgnorePatterns: ["<rootDir>/src", "<rootDir>/__tests__"]


