export default function GoalsChart(d3Service, Formatter) {
  'ngInject';

  return {
    restrict: 'EA',
    scope: {
      data: '=',
      selector: '=',
      onClick: '&',
    },
    link(scope, element, attrs) {
      // settings
      const margin = attrs.margin ? parseInt(attrs.margin, 0) : 20;
      const barHeight = attrs.barHeight ? parseInt(attrs.barHeight, 0) : 20;
      const barPadding = attrs.barPadding ? parseInt(attrs.barPadding, 0) : 5;

      // watching
      window.onresize = () => scope.$apply();
      scope.$watch(() => window.innerWidth, () => scope.render(scope.data, scope.selector));
      scope.$watch('data', newVals => scope.render(newVals, scope.selector), true);
      scope.$watch('selector', newVal => scope.render(scope.data, newVal));

      // svg-to-DOM
      const svg = d3Service.select(element[0]).append('svg').style('width', '100%');
      scope.render = (data, selector) => { // eslint-disable-line no-param-reassign
        svg.selectAll('*').remove();
        if (!data) return;
        const width = d3Service.select(element[0]).node().offsetWidth - margin;
        const height = scope.data.length * (barHeight + barPadding);

        function selectorDomain() {
          if (selector === 'total') {
            return [0, d3Service.max(data, d => d.target)];
          } else if (selector === 'current') {
            return [0, d3Service.max(data, d => d.current)];
          }
          return [0, 100];
        }
        const xScale = d3Service.scale.linear()
          .domain(selectorDomain())
          .range([0, width]);

        const gradient = svg.append('defs')
          .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%')
            .attr('spreadMethod', 'pad');
        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', '#707CF5')
          .attr('stop-opacity', 0.75);
        gradient.append('stop')
          .attr('offset', '60%')
          .attr('stop-color', '#707CF5')
          .attr('stop-opacity', 0.5);
        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', '#707CF5')
          .attr('stop-opacity', 0.2);

        const shadow = svg.append('defs')
          .append('filter')
            .attr('id', 'drop-shadow')
            .attr('height', '130%');
        shadow.append('feGaussianBlur')
          .attr('in', 'SourceAlpha')
          .attr('stdDeviation', 5)
          .attr('result', 'blur');
        shadow.append('feOffset')
          .attr('in', 'blur')
          .attr('dx', 5)
          .attr('dy', 5)
          .attr('result', 'offsetBlur');
        const feMerge = shadow.append('feMerge');
        feMerge.append('feMergeNode')
          .attr('in', 'offsetBlur');
        feMerge.append('feMergeNode')
          .attr('in', 'SourceGraphic');

        svg.attr('height', height)
          .style('fill', 'rgba(0, 0, 0, 0.25)');
          // .style('fill', 'url(#gradient)');

        svg.selectAll('rect.fore')
          .data(data).enter()
            .append('rect')
            .attr('class', 'rect-fore')
            .attr('height', barHeight)
            .attr('width', 0)
            .attr('x', Math.round(margin / 2))
            .attr('y', (d, i) => i * (barHeight + barPadding))
            .style('filter', 'url(#drop-shadow)')
            .transition()
              .duration(250)
              .attr('width', (d) => {
                if (selector === 'percentage') {
                  return xScale((d.current / d.target) * 100);
                } else if (selector === 'total') {
                  return xScale(d.target);
                }
                return xScale(d.current);
              });
        svg.selectAll('rect.back')
          .data(data).enter()
            .append('rect')
            .attr('class', 'rect-back')
            .attr('height', barHeight)
            .attr('width', width)
            .attr('fill', '#000')
            .attr('x', Math.round(margin / 2))
            .attr('y', (d, i) => i * (barHeight + barPadding))
            .on('click', d => scope.onClick({ item: d }));

        const texts = svg.selectAll('text.label').data(data).enter();
        texts.append('text')
          .attr('class', 'text-label')
          .attr('y', (d, i) => ((i + 1) * (barHeight + barPadding)) - (barHeight * 0.8))
          .attr('x', 15)
          .text(d => Formatter.titleCase(d[attrs.labelsKey]));
        texts.append('text')
          .attr('class', 'text-sublabel')
          .attr('y', (d, i) => ((i + 1) * (barHeight + barPadding)) - (barHeight * 0.15))
          .attr('x', 15)
          .text((d) => {
            if (selector === 'current') {
              return `$${Formatter.cleanNum(Formatter.twoDecimals(d.current))}`;
            } else if (selector === 'total') {
              return `$${Formatter.cleanNum(Formatter.twoDecimals(d.target))}`;
            }
            return Formatter.percentage(d.current / d.target, 1);
          });
      };
    },
  };
}
