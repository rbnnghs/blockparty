'use client'

import { useState } from 'react';
import { Container, MenuItem, Select, Typography, Box, Paper, Grid, Button, Tooltip } from '@mui/material';
import Draggable from 'react-draggable';

const servers = [
  { id: 1, name: 'Server 1', region: 'North America', load: 30, latency: 50, bandwidth: 1000, cost: 10 },
  { id: 2, name: 'Server 2', region: 'North America', load: 45, latency: 60, bandwidth: 1500, cost: 15 },
  { id: 3, name: 'Server 3', region: 'North America', load: 25, latency: 40, bandwidth: 2000, cost: 20 },
  { id: 4, name: 'Server 4', region: 'Europe', load: 20, latency: 70, bandwidth: 2000, cost: 12 },
  { id: 5, name: 'Server 5', region: 'Europe', load: 50, latency: 80, bandwidth: 1200, cost: 18 },
  { id: 6, name: 'Server 6', region: 'Europe', load: 35, latency: 65, bandwidth: 1800, cost: 22 },
  { id: 7, name: 'Server 7', region: 'Asia', load: 50, latency: 100, bandwidth: 1500, cost: 14 },
  { id: 8, name: 'Server 8', region: 'Asia', load: 40, latency: 90, bandwidth: 1600, cost: 16 },
  { id: 9, name: 'Server 9', region: 'Asia', load: 55, latency: 110, bandwidth: 1400, cost: 19 },
  // Add more servers as needed
];

const Dashboard = () => {
  const [region, setRegion] = useState('North America');
  const [selectedServer, setSelectedServer] = useState(null);

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleConnect = (server) => {
    setSelectedServer(server);
    alert(`Connected to ${server.name}`);
  };

  return (
    <Container>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Blockchain-Powered Distributed Servers Dashboard
      </Typography> */}
      <Box sx={{ marginBottom: 2 }}>
        <Select value={region} onChange={handleRegionChange}>
          <MenuItem value="North America">North America</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          {/* Add more regions as needed */}
        </Select>
      </Box>
      <Grid container spacing={3}>
        {servers.filter(server => server.region === region).map((server) => (
          <Grid item xs={12} sm={6} md={4} key={server.id}>
            {/* <Draggable> */}
              <Paper elevation={3} sx={{ padding: 2, cursor: 'move' }}>
                <Typography variant="h6">{server.name}</Typography>
                <Typography variant="body2">Region: {server.region}</Typography>
                <Typography variant="body2">Load: {server.load}%</Typography>
                <Typography variant="body2">Latency: {server.latency} ms</Typography>
                <Typography variant="body2">Bandwidth: {server.bandwidth} Mbps</Typography>
                <Typography variant="body2">Cost: {server.cost} XRP per compute unit</Typography>
                <Tooltip title="Connect to the best and closest server for your LLM project">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => handleConnect(server)}
                  >
                    Connect
                  </Button>
                </Tooltip>
              </Paper>
            {/* </Draggable> */}
          </Grid>
        ))}
      </Grid>
      {selectedServer && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5">Connected to {selectedServer.name}</Typography>
          <Typography variant="body1">
            Your LLM project is now hosted on {selectedServer.name} located in {selectedServer.region}. Enjoy low latency and high bandwidth for optimal performance.
          </Typography>
          <Typography variant="body1">
            Cost: {selectedServer.cost} XRP per compute unit.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;

