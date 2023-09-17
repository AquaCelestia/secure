const { Client, Intents, Permissions } = require('discord.js');
const { MongoClient } = require('mongodb');
const config = require('./config');
const { botPermissions } = require('./permissionsConfig');
const { handleRaidProtection } = require('./raidProtection');


const secure = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

let dbClient;
let db;

secure.on('ready', async () => {
  console.log(`Защита подключена ${secure.user.tag}`);

  dbClient = new MongoClient(config.mongodbUri);
  await dbClient.connect();
  db = dbClient.db(config.dbName);

  console.log('Подключён к MongoDB');
});

secure.on('messageCreate', async (message) => {
  if (message.author.bot) {
    if (config.automod.enabled && message.author.id === config.automod.botId) {
      const botId = message.author.id;
      const botName = message.author.username;
      const guildId = message.guild.id;
      const content = message.content;

      const botActivityCollection = db.collection('botActivity');
      await botActivityCollection.insertOne({
        botId,
        botName,
        guildId,
        content,
        timestamp: new Date(),
      });
    }

    handleRaidProtection(message.author.id, message.guild, config.raidLimit);
  }
});

secure.login(config.token);


const botPermissionsInteger = Permissions.FLAGS.VIEW_CHANNEL | Permissions.FLAGS.SEND_MESSAGES;


