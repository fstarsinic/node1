document.addEventListener('DOMContentLoaded', function () {
  // Fetch the integer value from the query parameter "number"
  //const queryParams = new URLSearchParams(window.location.search);
  //const num = parseInt(queryParams.get('num'));

    // Fetch data from server
    fetch(`/api/game/agg/points`)
      .then((response) => response.json())
      .then((data) => {
        // Extract player names and points from data
        console.log('/multi_data')
        const gameid = data.map((item) => item.game_id);
        const points = data.map((item) => item.points);
  
        console.log(`game: ${gameid}`)
        console.log(`points: ${points}`)

        Highcharts.chart('hichart_teamstats_a', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Points per Game'
            },
            subtitle: {
                text: 'Source: ' +
                    '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
                    'target="_blank">Wikipedia.com</a>'
            },
            xAxis: {
                categories: gameid
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Points',
                data: points
            }]
        });
    });
});