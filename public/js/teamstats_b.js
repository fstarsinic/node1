document.addEventListener('DOMContentLoaded', function () {
  // Fetch the integer value from the query parameter "number"
  //const queryParams = new URLSearchParams(window.location.search);
  //const num = parseInt(queryParams.get('num'));

    // Fetch data from server
    fetch(`/api/game/agg/gamedata`)
      .then((response) => response.json())
      .then((data) => {
        // Extract player names and points from data
        console.log(`/api/game/agg/gamedata`)
        const gameid = data.map((item) => item.game_id);
        const pct = data.map((item) => item.accumulated_two_point_shooting_percentage);
        const pct3 = data.map((item) => item.accumulated_three_point_shooting_percentage);
        const ftpct = data.map((item) => item.accumulated_ft_shooting_percentage);
  
        console.log(`game: ${gameid}`)
        console.log(`points: ${pct}`)
        console.log(`points: ${pct3}`)
        console.log(`points: ${ftpct}`)

        Highcharts.chart('hichart_teamstats_b', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Aggregated Shooting Pct.'
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
                    text: 'Shooting Pct.'
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
                name: 'Shooting Pct.',
                data: pct},
                {
                name: '3pt Shooting Pct.',
                data: pct3
                },
                {
                name: 'FT Shooting Pct.',
                data: ftpct
                }
            ]
        });
    });
});