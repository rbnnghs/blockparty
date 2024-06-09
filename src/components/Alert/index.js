import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import styles from './styles.module.css';

const Alert = ({ header, message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000); // Automatically close the alert after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          className={`${styles.alert} ${styles[type]}`}
          initial={{ opacity: 0, y: -10 }} // Initial animation values
          animate={{ opacity: 1, y: 0 }} // Animation when the alert is visible
          exit={{ opacity: 0, y: -10 }} // Animation when the alert is removed
          transition={{ duration: 0.3 }} // Animation duration
        >
          <div className={styles.alertHeader}>
            <p className={styles.alertHeaderText}>{header}</p>
          </div>
          <p className={styles.alertMessage}>{message}</p>
          <button className={styles.button} onClick={() => onClose()}>&times;</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Alert.propTypes = {
  header: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  onClose: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
