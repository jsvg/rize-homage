export default class Goals {
  constructor($timeout) {
    'ngInject';

    this.$timeout = $timeout;
    this.data = [
      { name: 'Emergency Fund', target: 3000.00, current: 2810.92 },
      { name: 'New Car Down Payment', target: 2000.00, current: 1688.15 },
      { name: 'Holiday Shopping Fund', target: 1000.00, current: 612.10 },
      { name: 'Aspen Ski Trip', target: 1800.00, current: 501.28 },
    ];
  }

  calculateTotalBalance() {
    return this.data.map(g => g.current).reduce((pre, cur) => pre + cur);
  }

  fetchAll() {
    return this.$timeout(() => this.data, 500);
  }

  addGoal(goal) {
    return this.$timeout(() => this.data.push(goal), 250);
  }

  updateGoal(oldGoalName, goal) {
    return this.$timeout(() => {
      const goalIndex = this.data.findIndex(g => g.name === oldGoalName);
      this.data[goalIndex] = goal;
    }, 230);
  }

  deleteGoal(goalSlug) {
    return this.$timeout(() => {
      const goalIndex = this.data.findIndex(goal => goal.name === goalSlug);
      this.data.splice(goalIndex, 1);
    }, 200);
  }
}
