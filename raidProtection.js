
const raidLimits = new Map();

function handleRaidProtection(botId, guild) {
  if (!raidLimits.has(botId)) {
    raidLimits.set(botId, 1);
  } else {
    raidLimits.set(botId, raidLimits.get(botId) + 1);

    if (raidLimits.get(botId) > config.raidLimit) {
      const botMember = guild.members.cache.get(botId);

      if (botMember) {
        botMember.kick('Превышен лимит рейда');
        console.log(`Бот ${botMember.user.tag} был кикнут по причине рейда`);
      }

      raidLimits.delete(botId);
    }
  }
}

module.exports = {
  handleRaidProtection,
};
