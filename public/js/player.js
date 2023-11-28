document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const firstname = (queryParams.get('firstname'));
    const lastname = (queryParams.get('lastname'));
    const url = '/api/player/search/findByPlayerName?firstname=' + firstname + '&lastname=' + lastname
    console.log(url)

        // Fetch data from server
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log('DATA')
          console.log(data)
          if (data.error) {
            // Display error message to the user
            const divElement = document.getElementById("container");
            divElement.innerHTML = "<b>" + data.error + "</b>";
            return;
          }
          // Extract player names and points from data
          const playerName = data.player;
          const teamName = data.team;

          // Get a reference to the div element by its id
          const divElement = document.getElementById("container");

          // Set the content of the div element
          divElement.innerHTML = "<b>" + playerName + "</b> is on the <b>" + teamName + "</b> team.";
        });
    });




