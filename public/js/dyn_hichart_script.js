document.addEventListener('DOMContentLoaded', function () {
  // Fetch the integer value from the query parameter "number"
  const queryParams = new URLSearchParams(window.location.search);
  const num = parseInt(queryParams.get('num'));


  function createChart(containerId, data) {
    Highcharts.chart(containerId, {
      title: {
        text: 'Chart Title',
      },
      xAxis: {
        categories: data.map((item) => item.category),
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      series: [
        {
          name: 'Data',
          data: data.map((item) => item.value),
        },
      ],
    });
  }


    // Fetch data from server
    fetch(`/hichart_data?num=${num}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract player names and points from data
        const players = data.map((item) => item.Player);
        const points = data.map((item) => item.Points);
  
        // Create the Highcharts hbar chart
        Highcharts.chart('chart-container', {
          chart: {
            type: 'bar',
          },
          title: {
            text: 'Backyard Classics - Points per Game',
          },
          xAxis: {
            categories: players,
            title: {
              text: 'Players',
            },
          },
          yAxis: {
            title: {
              text: 'Points',
            },
          },
          series: [
            {
              name: 'Points',
              data: points,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  });
  