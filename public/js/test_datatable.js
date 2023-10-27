document.addEventListener('DOMContentLoaded', function() {
  const table = $('#data_container').DataTable({
    ajax: '/api/players',
    columnDefs: [
      {
        targets: 0,
        checkboxes: true,
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