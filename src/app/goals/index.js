import angular from 'angular';
import GoalsConfig from './goals.config';
import GoalsCtrl from './goals.controller';
import GoalsChart from './main/goal-chart.directive';
import GoalsMainCtrl from './main/main.controller';
import GoalsNewCtrl from './new/new.controller';
import GoalsGoalCtrl from './goal/goal.controller';

const goalsModule = angular.module('app.goals', []);
goalsModule.config(GoalsConfig);
goalsModule.directive('goalsChart', GoalsChart);
goalsModule.controller('GoalsCtrl', GoalsCtrl);
goalsModule.controller('GoalsMainCtrl', GoalsMainCtrl);
goalsModule.controller('GoalsNewCtrl', GoalsNewCtrl);
goalsModule.controller('GoalsGoalCtrl', GoalsGoalCtrl);

export default goalsModule;
