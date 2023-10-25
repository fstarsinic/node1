document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('chart-container', {
      title: {
        text: 'My First Highcharts Chart'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
      },
      yAxis: {
        title: {
          text: 'Values'
        }
      },
      series: [{
        name: 'Data',
        data: [10, 15, 7, 12, 9]
      }]
    });
  });
  