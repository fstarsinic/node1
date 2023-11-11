document.addEventListener('DOMContentLoaded', function() {
  const queryParams = new URLSearchParams(window.location.search);
  const team = parseInt(queryParams.get('team'));
  const table = $('#example').DataTable({
    ajax: `/api/team/scorecard/${team}`,
    columns: [
        { title: 'Team' },
        { title: 'Points' },
        { title: 'Opponent' },
        { title: 'Points' },
        { title: 'Win/Loss' },
        ],
    });
});

