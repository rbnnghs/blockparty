'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './dashboard.module.css';

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
    console.log("Servers after region change:", servers.filter(server => server.region === region));
    if (servers.length > 0) {
      const best = servers.filter(server => server.region === region)
        .sort((a, b) => a.load - b.load)[0];  // Select the server with the least load
      setBestServer(best);
    }
  }, [servers, region]);

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    console.log("Region changed to:", event.target.value);
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
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.selectBox}>
        <select value={region} onChange={handleRegionChange} className={styles.select}>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
        </select>
      </div>
      <div className={styles.selectBox}>
        <select value={selectedTask ? selectedTask.id : ''} onChange={handleTaskChange} className={styles.select}>
          <option value="">Select Task</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>
              {task.code.slice(0, 50)}...
            </option>
          ))}
        </select>
      </div>
      <div className={styles.gridContainer}>
        {servers.filter(server => server.region === region).map((server) => (
          <div key={server.id} className={styles.card}>
            <div className={styles.cardHeader}>{server.name}</div>
            <div className={styles.cardBody}>
              <p>Region: {server.region}</p>
              <p>Load: {server.load}%</p>
              <p>Latency: {server.latency} ms</p>
              <p>Bandwidth: {server.bandwidth} Mbps</p>
              <p>Cost: {server.cost} XRP per compute unit</p>
            </div>
            <div className={styles.cardFooter}>
              <a className={styles.button} onClick={() => handleConnect(server)}>Connect</a>
            </div>
          </div>
        ))}
      </div>
      {selectedServer && selectedTask && (
        <div className={`${styles.card} ${styles.mt8}`}>
          <div className={styles.cardHeader}>Connected to {selectedServer.name}</div>
          <div className={styles.cardBody}>
            <p>Your task "{selectedTask.code.slice(0, 50)}..." is now hosted on {selectedServer.name} located in {selectedServer.region}. Enjoy low latency and high bandwidth for optimal performance.</p>
            <p>Cost: {selectedServer.cost} XRP per compute unit.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
