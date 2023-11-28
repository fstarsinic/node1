document.addEventListener('DOMContentLoaded', function () {
    // Fetch the integer value from the query parameter "number"
    const queryParams = new URLSearchParams(window.location.search);
    console.log('calling /api/game/agg/pointsByTeam')
      // Fetch data from server
      fetch(`/api/game/agg/pointsByTeam`)
        .then((response) => response.json())
        .then((data) => {    
            console.log('team packed bubble data')
            console.log(data)


            //this is where we transform the data for the highcharts packed bubble viz
            const dataSeries = [];
            var teamObj = {};
            var teamArr = [];
            var teamName = ''
            data.forEach(row => {
                // Process each row here
                if (row.Team != teamName) {
                    teamName = row.Team
                    console.log('New Team')
                    console.log(`row.Team is ${row.Team}`)
                    if (teamName != '') {
                        console.log(`Processing data for team ${teamName}`)
                        teamObj.data = teamArr
                        teamObj.name = teamName
                        dataSeries.push(teamObj);
                    } else {
                        console.log('Initializing...')
                    }
                    teamObj = {};
                    teamArr = [];
                }
                playerObj = {'name': row.Player, 'value': row.points}
                teamArr.push(playerObj);
            }
            );
            playerObj.data = teamArr
            dataSeries.push(teamObj)
            res = {'series': dataSeries, 'teamName': teamName}
            console.log('dataseries')
            console.log(dataSeries)

        
    Highcharts.chart('pb_container', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Points per Player',
        align: 'left'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.01
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>=',
                    value: 10
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: dataSeries
});
});
});