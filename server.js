const app = require('./app');
var { default: logger, api: loggerApi, apiOutPut: loggerApiOut } = require('./utils/logger')

process.on('uncaughtException', err => {
  logger.debug('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  logger.debug(err.name, err.message)
  // process.exit(1);
});

const port = process.env.PORT_APP || 3000;
const server = app.listen(port, () => {
  logger.info(`App running on port ${port}...`)
});


process.on('unhandledRejection', err => {
  logger.debug('UNHANDLED REJECTION! 💥 Shutting down...')
  logger.debug(err.name, err.message)
  // server.close(() => {
  //   process.exit(1);
  // });
});

process.on('SIGTERM', () => {
  logger.debug('👋 SIGTERM RECEIVED. Shutting down gracefully')
  // server.close(() => {
  //   console.log('💥 Process terminated!');
  // });
});
