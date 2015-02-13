# New Admin Page

## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules
	config/								--> All configuration files for the project: routing, etc.
  view1/                --> the view1 view template and logic
    view1.html            --> the partial template
    view1.js              --> the controller logic
    view1_test.js         --> tests of the controller
  view2/                --> the view2 view template and logic
    view2.html            --> the partial template
    view2.js              --> the controller logic
    view2_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

## Getting Started

#### Install Dependencies
```
npm install
```

#### Run App locally
```
npm start
```


## Development Tools

#### 1. Bower
[Bower](http://bower.io/) is a Front End dependency manager that makes it easy to quickly download and install new libraries. If you know a library's name, it's a simple one line install (you have to include it in your index.html as well, though):
```
bower install angular-bootstrap
```

#### 2. NPM
[NPM](https://www.npmjs.com/) is node's package manager, and the easiest way to install javascript files needed by your project. The difference between NPM and Bower, is that Bower manages Front End library dependencies that the client needs to run a page. NPM handles all the libraries that your project needs. In our case, we need it for testing, and for Gulp and Bower.

To install the necessary dependencies for this machine you'll want to run:
```
npm install
```
This looks in the package.json file and installs all the dependencies listed there. To add a dependency to the project, you'll want to use:
```
npm install --save-dev
```
The reason to use --save-dev is that it tells npm this is a development only dependency, and not to install it if this module is being installed as the dependency of another module (probably not likely in our case, but it's good practice anyways).

#### 3. Gulp
[Gulp](http://gulpjs.com/) is a streaming build system with a large number of built in libraries that allow you to process and manipulate files in your project as streams of data. An example would be running your JS files through a minification process, or compiling your Sass into CSS. This is configured in the Gulpfile. An example command that would run the 'sass' task as defined in that file:
```
gulp sass
```