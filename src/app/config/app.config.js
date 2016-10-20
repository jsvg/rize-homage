function AppConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  // $locationProvider.html5Mode({
    // enabled: true,
    // requireBase: false,
  // });

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'layout/layout.html',
    });

  $urlRouterProvider.otherwise('/goals');
}

export default AppConfig;
