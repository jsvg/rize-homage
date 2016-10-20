function GoalsConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.goals', {
      abstract: true,
      url: '/goals',
      controller: 'GoalsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'goals/goals.html',
      resolve: {
        goals($timeout, $state, Goals) {
          return Goals.fetchAll().then(
            goals => goals,
            err => console.log('Error fetching goal', err), // eslint-disable-line no-console
          );
        },
      },
    })
    .state('app.goals.main', {
      url: '',
      controller: 'GoalsMainCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'goals/main/main.html',
      title: 'Goals',
    })
    .state('app.goals.new', {
      url: '/new',
      controller: 'GoalsNewCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'goals/new/new.html',
      title: '✚ goal',
    })
    .state('app.goals.goal', {
      url: '/:goalSlug',
      controller: 'GoalsGoalCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'goals/goal/goal.html',
    });
}

export default GoalsConfig;
