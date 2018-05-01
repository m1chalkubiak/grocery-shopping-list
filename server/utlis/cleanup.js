import Connection from './connection';


export default () => {
  process.stdin.resume();

  const cleanupHandler = () => {
    Connection.end();
  };

  const exitHandler = (options, err) => {
    if (options.cleanup) cleanupHandler();
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
  };

  process.on('exit', exitHandler.bind(null,{ cleanup:true }));

  process.on('SIGINT', exitHandler.bind(null, { exit:true }));

  process.on('SIGUSR1', exitHandler.bind(null, { exit:true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit:true }));

  process.on('uncaughtException', exitHandler.bind(null, { exit:true }));
};