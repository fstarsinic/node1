
$(document).jQuery(function () {
  $('#data_container').DataTable();
});

document.addEventListener('DOMContentLoaded', function () { 

  //$('#data_container').DataTable();


  // Fetch the integer value from the query parameter "number"
  const queryParams = new URLSearchParams(window.location.search);
  const num = parseInt(queryParams.get('num'));

    // Fetch data from server
    fetch(`/api/players`)
      .then((response) => response.json())
      .then((data) => {
        // Extract player names and points from data
        console.log('/players js')
        console.log(data)

        // Extract column names from the first object in the JSON data
        const columnNames = Object.keys(data[0]);
        console.log(columnNames)

        const columnsConfig = columnNames.map((columnName) => ({ title: columnName }));

        // Convert JSON data to a tabular format (array of arrays)
        const tableData = data.map((item) => columnNames.map((columnName) => item[columnName]));

        console.log(tableData)

        new DataTable('#data_container', {
          columns: columnsConfig,
          data: data
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});
