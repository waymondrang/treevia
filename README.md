# Treevia

[![](https://img.shields.io/badge/-Visit%20Deployment%20→-informational)](https://treevia.sh1nx.com)

Treevia is a trivia question-answer style game created by Shilpa Chowbey, Sophia Conti, Annabella Macaluso, Jessica Wang, and Raymond Wang. The questions in this game target various climate issues that relate to agriculture and the effect of climate change on farming. Treevia aims to create fun and informative experiences about farming, sustainability in agriculture, and climate change.

# Contribute

To quickly get started, install the dependencies

```bash
npm install
```

Then run the development server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To test the WebSocket connectivity, you will need to start the WebSocket server while the development server is running:

```bash
npx ts-node index.ts
```

Alternatively, you can compile the file using `tsc` and run it using `node index.js`.

# Technology Stack

The main technologies in Treevia are React, Express, and Socket.io.

The single page web app is routed using the `react-router-dom` library and story-mode progress is saved via `react-cookie`.

Treevia is a server-authoritative game where the server and host process the game data and scores. When broadcasting the answer choices, the order is shuffled twice-over&mdash;once host-side and once client-side. In addition, the scores are processed server-side, including timestamps.

The questions banks for both multiplayer and story mode are stored as JSON files host-side.

While the web app was written in Node, the server was written in TypeScript due to the complexity of game data being stored and processed. Because the game is hosted on only one VM compute instance, game data can be stored locally as a variable on the server.

No CSS libraries or React component libraries were used during our development.

# Server Configuration

Initially, Firebase was used to host Treevia. However, as our project expanded to include a multiplayer experience, serverless hosting no longer was an option.

Currently, Treevia is hosted at [treevia.sh1nx.com](https://treevia.sh1nx.com/) and is powered by the Google Cloud platform.

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
