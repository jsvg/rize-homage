export default class NewGoalCtrl {
  constructor($state, Goals) {
    'ngInject';

    this.$state = $state;
    this.Goals = Goals;
  }

  saveGoal(goal) {
    this.Goals.addGoal(goal).then(() => this.$state.go('app.goals.main'));
  }
}
