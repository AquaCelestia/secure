module.exports = {
  botPermissions: {
    'bot1_id': {
      canDeleteChannels: true,
      allowedChannels: ['channel1_id', 'channel2_id'],
      forbiddenChannels: ['forbidden_channel1_id', 'forbidden_channel2_id'],
      
      forbiddenRoles: ['forbidden_role1_id', 'forbidden_role2_id'],
      forbiddenCategories: ['forbidden_category1_id', 'forbidden_category2_id'],
    },
    
  },
};
