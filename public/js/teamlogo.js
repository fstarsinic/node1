document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const team = (queryParams.get('team'));
    const url = '/api/team/' + team
    console.log(url)

        // Fetch data from server
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log('DATA')
          console.log(data)
          if (data.error) {
            // Display error message to the user
            console.log('error getting team info')
            return;
          }
          // Extract player names and points from data
          const logo = data[0].logo;
          console.log(logo)
          // Get a reference to the div element by its id
          const divElement = document.getElementById("teamlogo");

          // Set the content of the div element
          divElement.innerHTML = "<img height=100 width=100 src=/images/UIcomponents/" + logo + ">";
        });
    });




