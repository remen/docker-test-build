import * as net from 'net';

describe('Hello world', () => {
  it('works', () => {
    const socket = new net.Socket({});
    socket.connect(
      { autoSelectFamily: false, port: 5431, host: 'localhost' },
      () => {
        console.log('Socket established');
      },
    );
    socket.on('error', (err) => {
      console.error(err);
    });

    socket.resetAndDestroy();
  });
});
