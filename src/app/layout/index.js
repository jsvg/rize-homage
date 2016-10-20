import angular from 'angular';
import AppHeader from './header/header.component';
import AppFooter from './footer/footer.component';

const layoutModule = angular.module('app.layout', []);
layoutModule.component('appHeader', AppHeader);
layoutModule.component('appFooter', AppFooter);

export default layoutModule;
