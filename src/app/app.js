import angular from 'angular';
import 'angular-ui-router';

import constants from './config/app.constants';
import appConfig from './config/app.config';
import appRun from './config/app.run';
import './config/app.templates'; // templateCache from gulp
import './config/d3.module';

import './layout';
import './goals';
import './services';

const dependencies = [
  'ui.router',
  'd3',
  'templates',
  'app.layout',
  'app.goals',
  'app.services',
];

window.app = angular.module('app', dependencies);
angular.module('app').constant('AppConstants', constants);
angular.module('app').config(appConfig);
angular.module('app').run(appRun);
angular.bootstrap(document, ['app'], { strictDi: true });
