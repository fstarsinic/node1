document.addEventListener('DOMContentLoaded', function () {
    // Fetch the integer value from the query parameter "number"
    const queryParams = new URLSearchParams(window.location.search);
    console.log('calling /api/game/agg/pointsByGame')
      // Fetch data from server
      fetch(`/api/game/agg/pointsByGame`)
        .then((response) => response.json())
        .then((data) => {    
            console.log('team packed bubble data')
            console.log(data)


            //this is where we transform the data for the highcharts packed bubble viz
            var xcats = new Set();
            var ycats = new Set();
            const dataSeries = [];
            var gameName = ''
            var playerName = ''
            data.forEach(row => {
                // Process each row here
                if (row.Game != gameName) {
                    gameName = row.Game
                    xcats.add(row.Game)
                    //console.log(row.Game)
                } 
                if (row.Player != playerName) {
                    playerName = row.player_id
                    ycats.add(row.Player)
                    //console.log(row.Player)
                }
                dataArray = [row.game_num -1, row.player_id - 1, row.Points];
                dataSeries.push(dataArray);
            }
            );

            console.log('dataseries')
            console.log(dataSeries)

            console.log('xcats')
            console.log(xcats)
            console.log('ycats')
            console.log(ycats)

            const xarray = Array.from(xcats);
            const yarray = Array.from(ycats);

            console.log('xarray')
            console.log(xarray)
            console.log('yarray')
            console.log(yarray) 

        // Substring template helper for the responsive labels
        Highcharts.Templating.helpers.substr = (s, from, length) =>
            s.substr(from, length);

        // Create the chart
        Highcharts.chart('container', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                width: 800,
                height: 900,
                plotBorderWidth: 1
            },
            title: {
                text: 'Points per Game',
                style: {
                    fontSize: '1em'
                }
            },

            xAxis: {
                categories: xarray,
                title: 'Players'
            },

            yAxis: {
                categories: yarray,
                title: 'Games',
                reversed: true
            },

            accessibility: {
                point: {
                    descriptionFormat: '{(add index 1)}. ' +
                        '{series.xAxis.categories.(x)} sales ' +
                        '{series.yAxis.categories.(y)}, {value}.'
                }
            },

            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },

            tooltip: {
                format: '<b>{series.yAxis.categories.(point.y)}</b> in ' + 
                '<b>{series.xAxis.categories.(point.x)}</b> scored <br>' +
                    '<b>{point.value}</b> points <br>'
            },

            series: [{
                name: 'Points per Game',
                borderWidth: 1,
                data: dataSeries,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        yAxis: {
                            labels: {
                                format: '{substr value 0 1}'
                            }
                        }
                    }
                }]
            }
        });
    });
});
