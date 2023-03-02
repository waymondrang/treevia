# SYN 100 Project

To quickly get started, install the dependencies

```bash
npm install
```

Then run the development server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To test the WebSocket connectivity, start the WebSocket server while the development server is running:

```bash
node index.js
```

Open [http://localhost:3000](http://localhost:3000), navigate to the "Join" page, enter a room code, and click "Join." This will initiate a WebSocket connection with the server.
