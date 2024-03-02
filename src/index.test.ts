import * as net from 'net';

describe('Connection to localhost:5432', () => {
  it('succeeds', async () => {
    await attemptConnection('localhost', 5432);
  });
});

async function attemptConnection(host: string, port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket({});
    socket.connect({ host: host, port: port, autoSelectFamily: false }, () => {
      socket.resetAndDestroy();
      resolve();
    });
    socket.once('error', (err) => {
      reject(err);
    });
  });
}
