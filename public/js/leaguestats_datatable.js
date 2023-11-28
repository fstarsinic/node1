document.addEventListener('DOMContentLoaded', function() {
  const queryParams = new URLSearchParams(window.location.search);
  console.log('rendering league stats');
  const table = $('#leaguestats_container ').DataTable({
    ajax: {
        url: '/api/game/agg/standings',
        dataSrc: function (data) {
            console.log('leaguestats data')
            console.log(data)
            console.log(typeof data); // Outputs "object"
            console.log('isArray?')
            console.log(Array.isArray(data)); // Outputs "true"
            const aOfa = data;
            // Check if data is defined and not empty
            const arrayOfArrays = aOfa.map((object) => Object.values(object));
            console.log(arrayOfArrays)
    
            return arrayOfArrays;
          },
      },
    columns: [
        { title: 'Team' },
        { title: 'TeamId' },
        { title: 'Wins' },
        { title: 'Losses' },
        ],
    columnDefs: [
        {
            targets: 0,
            checkboxes: true, 
            render: function(data, type, row, meta) {
            // Assuming your data contains URLs in the "Link" column
            var url = data;
            var team_id =   row[1]
            // Customize the rendering by returning the HTML for the hyperlink
            return '<a href="/pages/team?team=' + team_id + '">' + url + '</a>';
            },
        },
        {
            targets: 1,
            visible: false,
        },
        ],
        order: [[2, 'desc']]      
    });
});
