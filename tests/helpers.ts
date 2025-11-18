import http, { Server, Re } from "http";

export function testServer(cb, port = 8888): Promise<{ server: Server }> {
  return new Promise((resolve, reject) => {
    const server = http.createServer(cb);

    // Let the OS pick a free port (0) so we can use it in the test
    server.listen(port, "127.0.0.1", (err) => {
      if (err) return reject(err);
      resolve({ server });
    });
  });
}
