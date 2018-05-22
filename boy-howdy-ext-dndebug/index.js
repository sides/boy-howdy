module.exports = {
  enable: on => {
    on('readyAndBootstrapped', client => {
      client.user.setStatus(client.config.debug
        ? 'dnd'
        : 'online');
    });
  }
};
