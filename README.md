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

### Random Notes

The main technologies in Treevia are React, Express, and Socket.io.

The single-page web app is routed using `react-router-dom` and the story mode progress is saved using `react-cookie`.

Treevia is a server-authoritative game where the server and hosts process the game data and scores. The question banks for both multiplayer and story mode are stored as JSON files host-side.

While the frontend was written in Node, the server was written in TypeScript due to the complexity of game data being stored and processed. Because the game is only hosted on one VM compute instance, game data can be stored locally as a variable on the server.

No CSS libraries or React component libraries were used during our development.

# Server Configuration

Initially, Firebase was used to host Treevia. However, as our project expanded to include a multiplayer experience, serverless hosting no longer was an option.

Currently, Treevia is hosted on the Google Cloud platform. It is connected to a subdomain on a custom domain&mdash;[treevia.sh1nx.com](https://treevia.sh1nx.com/).

The current server configuration is as follows:

- An unmanaged, nonscaling VM instance group with:
  - A single e2-medium primary VM instance\*
  - A single e2-small failover VM instance
    - _Used for monitoring primary server and starting maintenance server_
- A regional external load balancer with:
  - Self-managed SSL certificate
  - HTTP-to-HTTPS redirect through partial HTTP load balancer
  - A single backend service pointing to VM instance group
  - An external, reserved, standard-tier IPv4 address
  - Firewall rules for health check, proxies, and ssh
- Continuous deployment pipeline with Cloud Build
  - Will stop server on primary VM instance, pull latest changes, rebuild, and start server
- DNS configuration on custom domain

_\*The current server design is unscalable due to the local scope of game data. A possible scalable redesign could include a dedicated Redis server with Pub/Sub implementation._
