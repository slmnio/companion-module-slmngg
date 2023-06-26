# SLMN.GG Companion Controller

This module keeps a connection to SLMN.GG just like the dashboard and overlays.

## Connecting

Connect to the **data server** - either `https://data.slmn.gg` for the central server, or `http://localhost` if you're running locally. Your ports will be `443` and `8901` respectively.

Your client key is required to send requests. Get your token by logging into the website associated with the data server, then grabbing your token from your cookies (you can open your console and look at `document.cookie`).
