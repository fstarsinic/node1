document.addEventListener('DOMContentLoaded', function () {
  // Fetch the integer value from the query parameter "number"
  const queryParams = new URLSearchParams(window.location.search);
  const num = parseInt(queryParams.get('num'));

    // Fetch data from server
    fetch(`/api/summary?num=${num}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract player names and points from data
        console.log('/multi_data')
        const players = data.map((item) => item.Player);
        const points = data.map((item) => item.Points);
        const rebounds = data.map((item) => item.Rebounds);
        const turnovers = data.map((item) => item.Turnovers);
  
        console.log(`players: ${players}`)
        console.log(`points: ${points}`)
        console.log(`rebounds: ${rebounds}`)
        console.log(`turnovers: ${turnovers}`)

        // Create the Highcharts hbar chart
        Highcharts.chart('summary_container', {
            chart: {
              type: 'bar', // Use 'column' for a column chart
            },
            title: {
              text: 'Player Stats',
            },
            xAxis: {
                categories: players,
                title: {
                  text: 'Players',
                },
              },
            yAxis: {
              title: {
                text: 'Values',
              },
            },
            series: [
              {
                name: 'Points',
                data: points,
                color: 'blue', // Color for the 'Points' series
              },
              {
                name: 'Rebounds',
                data: rebounds,
                color: 'green', // Color for the 'Rebounds' series
              },
              {
                name: 'Turnovers',
                data: turnovers,
                color: 'red', // Color for the 'Turnovers' series
              }
              // Add more series objects for additional stats with different colors
            ],
          });
        })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  });
  