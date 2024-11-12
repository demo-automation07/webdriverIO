# demo 12

## Install

> Run below command from project root to install all the required packages

```sh
    npm install
```

## Run tests

> To run specific suite 

```sh
    npx wdio wdio.conf.js --spec <<spec_name>>
    for example: npx wdio wdio.conf.js --spec test\specs\automationdemosite\test.registration.js
```

## Browser Execution

>Chrome browser: The E2E testing will be executed in the latest verion of chromedriver (https://ghub.io/chromedriver)

## Reports

>Allure reports will be generated in report/allure/allure-report/index.html and for each steps logs will be displayed in the allure report
> To open report/allure/allure-report/index.html

