document.addEventListener('DOMContentLoaded', function () {
    // Fetch the integer value from the query parameter "number"
    const queryParams = new URLSearchParams(window.location.search);
    var num = 0
    if (queryParams.has('team')) {
        num = parseInt(queryParams.get('team'));
        console.log(`num is ${num}`)
    } else{
        num = 1;
    }
    console.log(`result: num is ${num}`)
  
      // Fetch data from server
      fetch(`/api/team/gameData/${num}`)
        .then((response) => response.json())
        .then((data) => {    
            console.log('team packed bubble data')
            console.log(data)


            //this is where we transform the data for the highcharts packed bubble viz
            const dataSeries = [];
            var playerObj = {};
            var dataArr = [];
            var playerName = '';
            var gameObj = {};
            var team_name = ''
            data.data.forEach(row => {
                // Process each row here
                if (row.Player != playerName) {
                    if (playerName != '') {
                        playerObj.data = dataArr
                        dataSeries.push(playerObj);
                    } else {
                    }
                    playerObj = {};
                    dataArr = [];
                }
                gameObj = {'name': row.Opponent, 'value': row.Points}
                dataArr.push(gameObj);
                playerName = row.Player;
                playerObj.name = playerName;
                team_name = row.Team;
                team_logo = '/images/UIComponents/' + row.logo;
                }
                );
            playerObj.data = dataArr
            dataSeries.push(playerObj)
            res = {'series': dataSeries, 'team_name': team_name, "team_logo": data.team_logo}
            console.log(res)




            const series = res.series
            const disp_team_name = res.team_name
            console.log(`team name is ${team_name}`)
            $('#teamname').text(team_name);
            // Create the Highcharts hbar chart
            Highcharts.chart('container', {
                chart: {
                    type: 'packedbubble',
                    height: '100%'
                },
                title: {
                    text: `Team Data for ${disp_team_name}`,
                    align: 'left'
                },
                tooltip: {
                    useHTML: true,
                    pointFormat: '<b>{point.name}:</b> {point.value}points'
                },
                plotOptions: {
                    packedbubble: {
                        minSize: '40%',
                        maxSize: '100%',
                        zMin: 0,
                        zMax: 1000,
                        layoutAlgorithm: {
                            gravitationalConstant: 0.05,
                            splitSeries: true,
                            seriesInteraction: false,
                            dragBetweenSeries: true,
                            parentNodeLimit: true
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name} - {point.value}',
                            filter: {
                                property: 'y',
                                operator: '>',
                                value: -1
                            },
                            style: {
                                color: 'black',
                                textOutline: 'none',
                                fontWeight: 'normal',
                                fontSize: '12px'
                            }
                        }
                    }
                },
                legend: {
                    enabled: true,
                    layout: 'horizontal', // Set legend layout to horizontal
                    align: 'center',      // Center the legend horizontally
                    verticalAlign: 'top'  // Position the legend at the top
                },
                series: series
            });
        });
    });
