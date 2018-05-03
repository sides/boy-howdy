module.exports = {
  bootstrap: on => {
    on('booted', client => {
      client.user.setStatus(client.config.debug
        ? 'dnd'
        : 'online');
    });
  }
};
