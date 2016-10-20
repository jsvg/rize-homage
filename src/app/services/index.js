import angular from 'angular';
import GoalsService from './goals.service';
import FormatterService from './formatter.service';

const servicesModule = angular.module('app.services', []);
servicesModule.service('Goals', GoalsService);
servicesModule.service('Formatter', FormatterService);

export default servicesModule;
