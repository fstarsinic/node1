document.addEventListener('DOMContentLoaded', function() {
  const table = $('#leaguestats_container').DataTable({
    ajax: '/api/game/agg/standings',
    columnDefs: [
      {
        targets: 0,
        checkboxes: true, 
        render: function(data, type, row, meta) {
          // Assuming your data contains URLs in the "Link" column
          var url = data;
          var team_id =   row[3]
          // Customize the rendering by returning the HTML for the hyperlink
          return '<a href="/pages/team?team=' + team_id + '">' + url + '</a>';
        },
      },
      
    ],
    order: [[1, 'asc']],
  });
});
