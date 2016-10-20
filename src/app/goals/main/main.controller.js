export default class GoalsMainCtrl {
  constructor($state, goals) {
    'ngInject';

    this.$state = $state;
    this.goals = goals;
    this.goalSelectorOptions = [
      { title: 'Current Totals', subtitle: 'The amount you have put towards your goals.', chartOption: 'current' },
      { title: 'Goal Progress', subtitle: 'Progress towards your goals as a percentage.', chartOption: 'percentage' },
      { title: 'Goal Targets', subtitle: 'The amount of cabbage it\'ll take to reach your goals.', chartOption: 'total' },
    ];
    this.goalSelectorIndex = 999999;
    this.goalSelector = this.goalSelectorOptions[this.goalSelectorIndex % 3];
  }

  goToNewGoal() {
    this.$state.go('app.goals.new');
  }

  d3onClick(item) {
    this.$state.go('app.goals.goal', { goalSlug: item.name });
  }

  advanceGoalSelector(direction) {
    if (direction === 'r') {
      this.goalSelectorIndex += 1;
    } else {
      this.goalSelectorIndex -= 1;
    }

    this.goalSelector = this.goalSelectorOptions[this.goalSelectorIndex % 3];
  }
}
