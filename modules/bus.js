const db = require('./db')

  function get_team_game_data(num, callback) {}

  // Function to transform db rows to highcharts series for packed bubble
  function get_team_game_data(num, callback) {
    console.log('bus.get_team_game_data()')
    db.get_team_game_data(num, (err, rows) => {
      if (err) {
        console.log(`error: ${err}`)
        callback(err, null);
      } else {
        console.log('Success getting data');
        console.log(rows)  ;

        //this is where we transform the data
        const series = [];
        var playerObj = {};
        var dataArr = [];
        var playerName = '';
        var gameObj = {};
        rows.forEach(row => {
            // Process each row here
            if (row.Player != playerName) {
                if (playerName != '') {
                    playerObj.data = dataArr
                    series.push(playerObj);
                } else {
                }
                playerObj = {};
                dataArr = [];
            }
            gameObj = {'name': row.Opponent, 'value': row.Points}
            dataArr.push(gameObj);
            playerName = row.Player;
            playerObj.name = playerName;
            }
          );
        playerObj.data = dataArr
        series.push(playerObj)
        callback(null, series)
      }
    });
  }
  

module.exports = {
    get_team_game_data
};
