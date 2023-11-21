// teamController.js
const teamSvc = require('../modules/svc/teamService')

async function getAllteams(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  console.log('/api/team endpoint')
  try{
      const teams =  await teamSvc.getAllTeams((err, rows) => {
      //res.json(teams);
      res.status(200).json({ data: teams});
      });      
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch teams: ${error.message}` });
    }
};
module.exports.getAllteams = getAllteams;


async function getTeamById(req, res) { 
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamid = req.params.id;
  console.log(`/api/team/:${teamid} endpoint`)
  //try {
    const team = await teamSvc.getTeamById(teamid);
      if (!team?.length) {
        res.status(404).json({ error: `Results Not Found for ${teamid}`});
        return;
      }
    res.status(200).json({ data: result });  
  };// catch (error) {
   // res.status(500).json({ error: `Failed to fetch teams: ${error.message}` });
  //}

//};
module.exports.getTeamById = getTeamById;


async function getTeamByName(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamName = req.params.teamName;
  console.log(`/api/team/findByName/:${teamName} endpoint`)
  const team = await teamSvc.getTeamByName(teamName, (err, rows) => {
    if (!team?.length) {
      res.status(404).json({ error: `Results Not Found for ${teamName}`});
      return;
    }
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ data: rows });
    });      
};
module.exports.getTeamByName = getTeamByName;


async function getTeamScorecard(req, res) {  
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamId = req.params.id;
  console.log(`/api/team/scorecard/:${teamId} endpoint`)
  rows = await teamSvc.getTeamScorecard(teamId);
  console.log(`teamController.rows:`);
  console.log(rows);
  if (!rows?.length) {
    res.status(404).json({ error: `Results Not Found for ${teamId}`});
    return;
  }
  console.log('teamController: returning scorecard')
  res.status(200).json({ data: rows });
};
module.exports.getTeamScorecard = getTeamScorecard;


async function getTeamGameData(req, res) {
  res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
  const teamId = req.params.id;
  console.log(`/api/team/gameData/:${teamId} endpoint`)
  rows = await teamSvc.getTeamGameData(teamId);
  if (!rows?.length) {
    res.status(404).json({ error: `Results Not Found for ${teamId}`});
    return;
  }
    res.status(200).json({ data: rows });    
};
module.exports.getTeamGameData = getTeamGameData;