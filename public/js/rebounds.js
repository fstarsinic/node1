document.addEventListener('DOMContentLoaded', function () {
  // Fetch the integer value from the query parameter "number"
  const queryParams = new URLSearchParams(window.location.search);
  const num = parseInt(queryParams.get('num'));

    // Fetch data from server
    fetch(`/api/rebounds?num=${num}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract player names and points from data
        const players = data.map((item) => item.Player);
        const rebounds = data.map((item) => item.Rebounds);
  
        // Create the Highcharts hbar chart
        Highcharts.chart('rebounds-container', {
          chart: {
            type: 'bar',
          },
          title: {
            text: 'Backyard Classics - Rebounds per Game',
          },
          xAxis: {
            categories: players,
            title: {
              text: 'Players',
            },
          },
          yAxis: {
            title: {
              text: 'Rebounds',
            },
          },
          series: [
            {
              name: 'Rebounds',
              data: rebounds,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  });
  