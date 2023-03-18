const checkMatchEventBody = (matchEventBody) => {
  return (
    matchEventBody.first_team === undefined ||
    matchEventBody.first_team_logo === undefined ||
    matchEventBody.second_team === undefined ||
    matchEventBody.second_team_logo === undefined ||
    matchEventBody.cup_name === undefined ||
    matchEventBody.channel_name === undefined ||
    matchEventBody.channels_quality === undefined ||
    matchEventBody.commenter_name === undefined ||
    matchEventBody.date_of_match_with_time === undefined
  );
};

module.exports = checkMatchEventBody;
