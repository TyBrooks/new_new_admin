# vl-admin-app
This is a seed repo designed according to VigLink's angular styleguide. Simply clone the project, and follow the Getting Started Instructions below. This repo is based on the [angular-seed](https://github.com/angular/angular-seed) project on GitHub, but customized for VigLink.

## Getting Started

#### Install Dependencies
```
npm install
```

#### Run App locally
```
npm start
```

## Directory Layout

```
app/                    --> all of the source files for the application
	build/								--> for compiled files like css that's been created from sass.
	config/								--> routing and other app-wide configuration goes here
	directives/						--> all directives go here, especially universally applicable ones
	filters/							--> all filters go here
	lib/									--> A place where all your 3rd party libraries go.
	modules/							--> all features go into their own folder here
		feature1/						--> All the files necessary to implement one feature
			feature1.html           --> the partial template
			feature1.list.html			--> a subview of feature1
			feature1_controller.js  --> the controller logic
			feature1_test.js        --> tests of the controller
		feature2/                 --> A second feature in a separate folder and module
			...
	stylesheets/					--> All app styling should go here
	app.js                --> main application module; all dependency modules listed here
	index.html            --> app layout file (the main html template file of the app)
bower_components/     --> client side dependencies installed by Bower go here automatically
e2e-tests/            --> end-to-end tests
	protractor-conf.js    --> Protractor config file
	scenarios.js          --> end-to-end scenarios to be run by Protractor
node_modules/					--> a folder where all your node.js dependencies go.
karma.conf.js         --> config file for running unit tests with Karma
```

## Development Tools

#### 1. Bower
[Bower](http://bower.io/) is a dependency manager for client side libraries that makes it easy to quickly download and install new libraries. If you know a library's name, it's a simple one line install (you have to include it in your index.html as well, though):
```
bower install angular-bootstrap
```

#### 2. NPM
[NPM](https://www.npmjs.com/) is node's package manager, and like Bower is used to manage dependencies needed by your project. Unlike Bower, NPM is primarily for server-side dependencies. Our testing libraries and tooling system (see #3 below) are all installed and managed by NPM, for example. If a library is going to be loaded by a client in a browser, then you use Bower, otherwise, NPM is your tool.

To install the necessary dependencies for this machine you'll want to run:
```
npm install
```
This looks in the package.json file and installs all the dependencies listed there, and as an added bonus it automatically calls Bower's install function. To add a dependency to the project, you'll want to use:
```
npm install --save-dev %{library-name}
```
The reason to use --save-dev is that it tells npm this is a development only dependency, and not to install it if this module is being installed as the dependency of another module (probably not likely in our case, but it's good practice anyways).

#### 3. Gulp
[Gulp](http://gulpjs.com/) is a streaming build system with a large ecosystem of third party plugins that allow you to process and manipulate files in your project as streams of data. An example would be running your JS files through a minification process, or compiling your Sass into CSS. This is configured in the Gulpfile. An example command that would run the 'sass' task as defined in that file:
```
gulp sass					--> Compiles scss into css
gulp watch 				--> Watches files affected by above, runs all associated jobs on change
gulp rename-app --old oldname --new newname 	--> Renames app
```

## Adding a Feature

####1. Add a folder for your module
Create a new folder for your feature under app/modules. All features should have their own folder. This is where all your feature-specific logic lives.

####2. Add or script your files
You'll need the actual controller and template file that you pointed your router at. These should live under the app/modules/%{feature_name}/ directory, which you created in step #1. All logic specific to your feature should go in this folder, but if you use directives or filters that have a general application, you should add them to app/directive or app/filters instead.
When scripting your controller, you'll want to make sure you create a separate module and assign your controller to it.

####3. Add your module to the app initialization.
In app/app.js, you'll need to add your module to the list of modules that the app initializes. Your module should be named in the format of %{appName}.%{moduleName}. E.g. adminApp.featureOne.

####4. Add a route for your feature.
In app/config/routes.js you'll need to add a route for your feature. Here's an example route:
```
    .state('nav.customInsert', {
      url: "/custom-insert",
      templateUrl: 'modules/custom_insert/custom_insert.html',
      controller: 'CustomInsertCtrl'
    })
```
Your feature should have the state 'nav.%{featureName}', since all features are subviews within the navigation layout that the 'nav' state loads. You'll also need to provide the location of your html subview template and the name of the controller for your feature.
	
####5. Add your feature to the navigation bar
In app/modules/main/nav.html, find the accordion-group that your feature fits in, or add a new one. The angular router we use (ui-router) uses anchor tags with ui-sref instead of the usual href. 'ui-sref' should match the name of the state you just added in step #3. Ex:
```
		<accordion-group heading='OpsTools'>
			<ul class='list-unstyled'>
				<a ui-sref='nav.elasticSearch'><li>Elastic Search</li></a>
				<a ui-sref='nav.sidDecoder'><li>Click SID Decoder</li></a>
				<a ui-sref='nav.customInsert'><li>Custom Insert</li></a>
			</ul>
		</accordion-group>
```
The value of 'heading' sets the accordion box text, the value of ui-sref is the name of the router state, and the li text should be the display name of your feature.

####6. Add your JS files to index.html
All newly created JS files need to be loaded through index.html.