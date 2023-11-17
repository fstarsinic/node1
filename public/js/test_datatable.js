document.addEventListener('DOMContentLoaded', function() {
  const table = $('#data_container').DataTable({
    ajax: '/api/player/stats/playerStats',
    columnDefs: [
      {
        targets: 2,
        checkboxes: true, 
        render: function(data, type, row, meta) {
          // Assuming your data contains URLs in the "Link" column
          var url = data;
          var team_id =   row[3]
          // Customize the rendering by returning the HTML for the hyperlink
          return '<a href="/pages/team?team=' + team_id + '">' + url + '</a>';
        },
      },
      {
        targets: 3,
        visible: false,
      },
    ],
    order: [[1, 'asc']],
  });
});


// this is old javascript syntax
/*
$(document).ready(function() {
  var table = $('#data_container').DataTable({
    'ajax': '/api/players',
    'columnDefs': [
        {
           'targets': 0,
           'checkboxes': true
        }
     ],
     'order': [[1, 'asc']]
  });
});
*/