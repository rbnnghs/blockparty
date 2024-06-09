import React from 'react';
import { motion } from 'framer-motion';
import styles from './node.module.css';

const Node = ({ x, y, letter }) => {
  return (
    <motion.div
      className={styles.nodeContainer}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ top: y, left: x }}
    >
      {letter}
    </motion.div>
  );
};

export default Node;