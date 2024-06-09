'use client';

import { useEffect, useState } from 'react';
import { Container, MenuItem, Select, Typography, Paper, Grid, Button, Tooltip } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [region, setRegion] = useState('North America');
  const [servers, setServers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [bestServer, setBestServer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.get('/api/servers');
        console.log("Fetched servers:", response.data.servers);
        setServers(response.data.servers);
      } catch (err) {
        console.error("Error fetching servers:", err);
        setError("Error fetching servers.");
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        console.log("Fetched tasks:", response.data.tasks);
        setTasks(response.data.tasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Error fetching tasks.");
      }
    };

    fetchServers();
    fetchTasks();
  }, []);

  useEffect(() => {
    if (servers.length > 0) {
      const best = servers.filter(server => server.region === region)
        .sort((a, b) => a.load - b.load)[0];  // Select the server with the least load
      setBestServer(best);
    }
  }, [servers, region]);

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleTaskChange = (event) => {
    const taskId = event.target.value;
    const task = tasks.find(task => task.id === taskId);
    setSelectedTask(task);
  };

  const handleConnect = (server) => {
    setSelectedServer(server);
    alert(`Connected to ${server.name}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blockchain-Powered Distributed Servers Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <Select value={region} onChange={handleRegionChange} className="border p-2 rounded">
          <MenuItem value="North America">North America</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
        </Select>
      </div>
      <div className="mb-4">
        <Select value={selectedTask ? selectedTask.id : ''} onChange={handleTaskChange} className="border p-2 rounded">
          <MenuItem value="">Select Task</MenuItem>
          {tasks.map(task => (
            <MenuItem key={task.id} value={task.id}>
              {task.code.slice(0, 50)}...
            </MenuItem>
          ))}
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
      {bestServer && (
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-xl font-semibold">Suggested Server: {bestServer.name}</h2>
          <p>Region: {bestServer.region}</p>
          <p>Load: {bestServer.load}%</p>
          <p>Latency: {bestServer.latency} ms</p>
          <p>Bandwidth: {bestServer.bandwidth} Mbps</p>
          <p>Cost: {bestServer.cost} XRP per compute unit</p>
        </div>
      )}
      {selectedServer && selectedTask && (
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-xl font-semibold">Connected to {selectedServer.name}</h2>
          <p>Your task "{selectedTask.code.slice(0, 50)}..." is now hosted on {selectedServer.name} located in {selectedServer.region}. Enjoy low latency and high bandwidth for optimal performance.</p>
          <p>Cost: {selectedServer.cost} XRP per compute unit.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
