export default class GoalsGoalCtrl {
  constructor($stateParams, $state, $rootScope, Goals, goals, AppConstants) {
    'ngInject';

    this.$state = $state;
    this.goalSlug = $stateParams.goalSlug;
    this.Goals = Goals;
    this.goal = goals.filter(g => g.name === $stateParams.goalSlug)[0];

    $rootScope.pageTitle = `${this.goal.name} - ${AppConstants.appName}`; // eslint-disable-line no-param-reassign
  }

  updateGoal() {
    this.Goals.updateGoal(this.goalSlug, this.goal).then(() => this.$state.go('app.goals.main'));
  }

  deleteGoal() {
    this.Goals.deleteGoal(this.goal.name).then(() => this.$state.go('app.goals.main'));
  }
}
