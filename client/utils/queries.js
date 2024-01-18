// Fetches All Seasons for selecting season
export async function getSeasons() {
  const query = await fetch('/api/season')
  const result = await query.json()
  const payload = result.payload
  return payload
}

// Fetches All Games by Season Id
export async function getSeasonGames(seasonId) {
  const query = await fetch(`/api/game/season/${seasonId}`)
  const result = await query.json()
  const payload = result.payload
  return payload
}

// Fetches All Teams by Season Id
export async function getSeasonTeams(seasonId) {
  const query = await fetch(`/api/team/season/${seasonId}`)
  const result = await query.json()
  const teams = result.payload
  return teams
}

// Fetches Team Roster by Id
export async function getTeamRoster(teamId) {
  const query = await fetch(`/api/player/team/${teamId}`)
  const result = await query.json()
  const roster = result.payload
  roster.sort(function (a, b) {
    let x = a.firstName.toLowerCase();
    let y = b.firstName.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  })
  return roster
}


// Fetches All Goalies
export async function getAllGoalies() {
  const query = await fetch('/api/player/goalies')
  const result = await query.json()
  const goalies = result.payload
  goalies.sort(function (a, b) {
    let x = a.firstName.toLowerCase();
    let y = b.firstName.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  })
  return (goalies)
}

// Fetches All Rubber Puckie Teams
export async function getPuckieTeams() {
  const query = await fetch('/api/team/name/Rubber Puckies')
  const result = await query.json()
  const teams = result.payload
  return(teams)
}

// Update Game
export async function updateGame(gameId, gameInfo) {
  try {
    const query = await fetch(`/api/game/${gameId}`, {
      method: 'PUT',
      body: JSON.stringify(gameInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return query
  } catch (err) {
    console.log(err)
  }
}

// Create Game
export async function createGame(gameInfo) {
  try {
    const query = await fetch('/api/game', {
      method: "POST",
      body: JSON.stringify(gameInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return query;
  } catch (err) {
    console.log(err.message)
  }
}

// Fetches Player Info
export async function getPlayer(playerId) {
  const query = await fetch(`/api/player/${playerId}`)
  const result = await query.json()
  const roster = result.payload
  // roster.sort(function (a, b) {
  //   let x = a.startTime;
  //   let y = b.startTime;
  //   if (x < y) { return -1; }
  //   if (x > y) { return 1; }
  //   return 0;
  // })
  return roster
}