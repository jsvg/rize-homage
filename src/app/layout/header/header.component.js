class AppHeaderCtrl {
  constructor($scope, AppConstants, Goals, Formatter) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.totalBalance = () => `$${Formatter.cleanNum(Formatter.twoDecimals(Goals.calculateTotalBalance()))}`; // eslint-disable-line no-param-reassign
  }
}

const AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header/header.html',
};

export default AppHeader;
