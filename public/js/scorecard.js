document.addEventListener('DOMContentLoaded', function() {
  const queryParams = new URLSearchParams(window.location.search);
  const team = parseInt(queryParams.get('team'));
  const table = $('#scorecard_container').DataTable({
    ajax: {
        url: `/api/team/scorecard/${team}`,
        error: function(xhr, textStatus, errorThrown) {
          if (xhr.status === 404) {
              // Handle 404 error here
              console.error('Resource not found');
              // Display a user-friendly message to the user
              alert('The requested resource was not found.');
          } else {
              // Handle other errors
              console.error('An error occurred:', textStatus, errorThrown);
              // Display a generic error message to the user
              alert('An error occurred while fetching data.');
          }
      },
    },
    columns: [
        { title: 'Team' },
        { title: 'Points' },
        { title: 'Opponent' },
        { title: 'Points' },
        { title: 'Win/Loss' },
        ],
    });
});

