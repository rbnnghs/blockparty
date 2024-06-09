import React from 'react';
import { motion } from 'framer-motion';
import Node from './Node';
import styles from './node.module.css';

const nodes = [
  { id: 1, x: 50, y: 150, letter: 'A' },
  { id: 2, x: 200, y: 180, letter: 'B' },
  { id: 3, x: 400, y: 250, letter: 'C' },
  { id: 4, x: 150, y: 400, letter: 'D' },
  { id: 5, x: 300, y: 450, letter: 'E' },
];

const networkPoints = [
  { id: 'net1', x: 100, y: 300 },
  { id: 'net2', x: 350, y: 300 },
  { id: 'net3', x: 100, y: 500 },
  { id: 'net4', x: 350, y: 500 },
];

const NetworkDiagram = () => {
  return (
    <div className={styles.networkContainer}>
      {networkPoints.map((net) => (
        <motion.div
          key={net.id}
          className={styles.networkPoint}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: net.id.charCodeAt(0) * 0.05 }}
          style={{ top: net.y, left: net.x }}
        />
      ))}
      {nodes.map((node) => (
        <Node key={node.id} x={node.x} y={node.y} letter={node.letter} />
      ))}
      <motion.svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        {nodes.map((node) =>
          networkPoints.map((net) => (
            <motion.line
              key={`${node.id}-${net.id}`}
              x1={node.x + 20}
              y1={node.y + 20}
              x2={net.x + 6}
              y2={net.y + 6}
              stroke="#2c3e50"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: node.id * 0.2 }}
            />
          ))
        )}
      </motion.svg>
    </div>
  );
};

export default NetworkDiagram;