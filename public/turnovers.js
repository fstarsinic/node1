document.addEventListener('DOMContentLoaded', function () {
  // Fetch the integer value from the query parameter "number"
  const queryParams = new URLSearchParams(window.location.search);
  const num = parseInt(queryParams.get('num'));

    // Fetch data from server
    fetch(`/api/turnovers?num=${num}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract player names and points from data
        const players = data.map((item) => item.Player);
        const turnovers = data.map((item) => item.Turnovers);
  
        // Create the Highcharts hbar chart
        Highcharts.chart('turnover-container', {
          chart: {
            type: 'bar',
          },
          title: {
            text: 'Backyard Classics - Turnovers per Game',
          },
          xAxis: {
            categories: players,
            title: {
              text: 'Players',
            },
          },
          yAxis: {
            title: {
              text: 'Turnovers',
            },
          },
          series: [
            {
              name: 'Turnovers',
              data: turnovers,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  });
  