document.addEventListener('DOMContentLoaded', function () {
    // Fetch the integer value from the query parameter "team"
    const queryParams = new URLSearchParams(window.location.search);
    const num = parseInt(queryParams.get('team'));
  
    let pointseries = [];
    let reboundseries = [];
    let turnoverseries = [];
    let games = [];

      // Fetch data from server
      fetch(`/api/team/gameResults/${num}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('team game results data')
            console.log(data)
            let playerPoints = {};
            let playerRebounds = {};
            let playerTurnovers = {};
            let gameset = new Set();
            // Process each row in the query results
            data.data.forEach(row => {
                let player = row.Player;
                let points = row.Points;
                let rebounds = row.Rebounds;
                let turnovers = row.Turnovers;
                gameset.add(row.Game);

                // Initialize an array for the player if it doesn't exist
                if (!playerPoints[player]) {
                    playerPoints[player] = [];
                }

                if (!playerRebounds[player]) {
                    playerRebounds[player] = [];
                }

                if (!playerTurnovers[player]) {
                    playerTurnovers[player] = [];
                }

                // Append the points to the player's array
                playerPoints[player].push(points);
                playerRebounds[player].push(rebounds);
                playerTurnovers[player].push(turnovers);
            });
            let ppjson = JSON.stringify(playerPoints);
            console.log(ppjson);
            let prjson = JSON.stringify(playerRebounds);
            console.log(prjson);
            let ptjson = JSON.stringify(playerTurnovers);
            console.log(ptjson);

/*
Below we will transform data from this format..
        {"Bradley Kishaba":[4,16,21,6,16],
        "Caden Neel":[5,6,3,10,11],
        "Jake Taylor":[11,9,16,23,22],
        "Max Gasser":[7,5,14,10,6]}

to this..

        [
            {"name":"Bradley Kishaba","data":[4,16,21,6,16]},
            {"name":"Caden Neel","data":[5,6,3,10,11]},
            {"name":"Jake Taylor","data":[11,9,16,23,22]},
            {"name":"Max Gasser","data":[7,5,14,10,6]}
        ]
*/

            // Convert the playerPoints object into the desired series array
            pointseries = Object.keys(playerPoints).map(player => {
                return {
                    name: player,
                    data: playerPoints[player]
                };
            });
            console.log(pointseries);
            reboundseries = Object.keys(playerRebounds).map(player => {
                return {
                    name: player,
                    data: playerRebounds[player]
                };
            });
            console.log(reboundseries);

            turnoverseries = Object.keys(playerTurnovers).map(player => {
                return {
                    name: player,
                    data: playerTurnovers[player]
                };
            });
            console.log(turnoverseries);



            games = Array.from(gameset);
            console.log(games);

            // Convert the object to a JSON string
            let jsonString = JSON.stringify(pointseries);

            // Print the JSON string to the console for inspection
            console.log(jsonString);

        // Data retrieved from: https://www.uefa.com/uefachampionsleague/history/
        Highcharts.chart('sb_container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Scoring by Game'
            },
            xAxis: {
                categories: games
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Points'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: pointseries

        });
        // Data retrieved from: https://www.uefa.com/uefachampionsleague/history/
        Highcharts.chart('sb_container2', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Rebounds by Game'
            },
            xAxis: {
                categories: games
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rebounds'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: reboundseries

        });

        Highcharts.chart('sb_container3', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Turnovers per game'
            },
            xAxis: {
                categories: games
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Turnovers'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: turnoverseries

        });
    });
});