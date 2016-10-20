import angular from 'angular';
import d3 from 'd3';

angular.module('d3', [])
  .factory('d3Service', () => {
    'ngInject';

    return d3;
  });
