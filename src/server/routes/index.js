module.exports = (app) => {
  require('./playerRouter')(app);
  require('./roomRouter')(app);
};
