document.addEventListener('DOMContentLoaded', function() {
  const queryParams = new URLSearchParams(window.location.search);
  console.log('rendering players');
  const table = $('#data_container').DataTable({
    ajax: {
        url: '/api/player/stats/playerStats',
        dataSrc: function (data) {
            console.log('data')
            console.log(data.data)
            console.log(typeof data.data); // Outputs "object"
            console.log('isArray?')
            console.log(Array.isArray(data.data)); // Outputs "true"
            const aOfa = data.data;
            // Check if data is defined and not empty
            const arrayOfArrays = aOfa.map((object) => Object.values(object));
            console.log(arrayOfArrays)
    
            return arrayOfArrays;
          },
      },
    columns: [
        { title: 'Firstname' },
        { title: 'Lastname' },
        { title: 'Team' },
        { title: 'TeamId' },
        { title: 'Points' },
        { title: 'Rebounds' },
        { title: 'Assists' },
        { title: 'Steals' },
        { title: 'Blocks' },
        { title: 'Turnovers' },
        { title: 'FieldGoalPct' },
        { title: 'ThreePointPct' },
        { title: 'FTPct' },
        ],
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
        order: [[1, 'asc']]      
    });
});
