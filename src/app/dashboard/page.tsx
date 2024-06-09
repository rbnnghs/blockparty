'use client';

import { useState } from 'react';
import { Container, MenuItem, Select, Typography, Paper, Grid, Button, Tooltip } from '@mui/material';

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blockchain-Powered Distributed Servers Dashboard</h1>
      <div className="mb-4">
        <Select value={region} onChange={handleRegionChange} className="border p-2 rounded">
          <MenuItem value="North America">North America</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          {/* Add more regions as needed */}
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {servers.filter(server => server.region === region).map((server) => (
          <Paper key={server.id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">{server.name}</h2>
            <p>Region: {server.region}</p>
            <p>Load: {server.load}%</p>
            <p>Latency: {server.latency} ms</p>
            <p>Bandwidth: {server.bandwidth} Mbps</p>
            <p>Cost: {server.cost} XRP per compute unit</p>
            <Tooltip title="Connect to the best and closest server for your LLM project">
              <Button
                variant="contained"
                color="primary"
                className="mt-2"
                onClick={() => handleConnect(server)}
              >
                Connect
              </Button>
            </Tooltip>
          </Paper>
        ))}
      </div>
      {selectedServer && (
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-xl font-semibold">Connected to {selectedServer.name}</h2>
          <p>Your LLM project is now hosted on {selectedServer.name} located in {selectedServer.region}. Enjoy low latency and high bandwidth for optimal performance.</p>
          <p>Cost: {selectedServer.cost} XRP per compute unit.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
