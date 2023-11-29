document.addEventListener('DOMContentLoaded', function () {
    // Fetch the integer value from the query parameter "team"
    const queryParams = new URLSearchParams(window.location.search);
    const num = parseInt(queryParams.get('team'));
  
    let dataseries = [];
    let games = [];

      // Fetch data from server
      fetch(`/api/team/gameResults/${num}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('team game results data')
            console.log(data)
            let playerPoints = {};
            let gameset = new Set();
            // Process each row in the query results
            data.data.forEach(row => {
                let player = row.Player;
                let points = row.Points;
                gameset.add(row.Game);

                // Initialize an array for the player if it doesn't exist
                if (!playerPoints[player]) {
                    playerPoints[player] = [];
                }

                // Append the points to the player's array
                playerPoints[player].push(points);
            });
            let ppjson = JSON.stringify(playerPoints);
            console.log(ppjson);

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
            dataseries = Object.keys(playerPoints).map(player => {
                return {
                    name: player,
                    data: playerPoints[player]
                };
            });

            console.log(dataseries);
            games = Array.from(gameset);
            console.log(games);

            // Convert the object to a JSON string
            let jsonString = JSON.stringify(dataseries);

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
            series: dataseries

        });
        });
});

    