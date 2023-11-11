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
      fetch(`/api/team/teamGameData/${num}`)
        .then((response) => response.json())
        .then((data) => {    
            const series = data.series
            const team_name = data.team_name
            console.log(`team name is ${team_name}`)
            $('#teamname').text(team_name);
            // Create the Highcharts hbar chart
            Highcharts.chart('container', {
                chart: {
                    type: 'packedbubble',
                    height: '100%'
                },
                title: {
                    text: `Team Data for ${team_name}`,
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
