import React from 'react';
import styles from './styles.module.css';

const BlockCloud = () => (
  <svg
    width="200"
    height="100"
    viewBox="0 0 200 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main central block */}
    <rect x="70" y="40" width="30" height="30" className={styles.block} />

    {/* Top left block */}
    <rect x="40" y="20" width="30" height="30" className={styles.block} />
    
    {/* Top right block */}
    <rect x="100" y="20" width="30" height="30" className={styles.block} />
    
    {/* Bottom left block */}
    <rect x="40" y="60" width="30" height="30" className={styles.block} />
    
    {/* Bottom right block */}
    <rect x="100" y="60" width="30" height="30" className={styles.block} />
  </svg>
);

export default BlockCloud;
