'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import Cloud from "../../../public/assets/cloud.png"

export function HeroSection() {
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={styles.hero}>
      <div className={styles.gridBackground}></div>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={testimonialVariants}
            className={styles.access}
          >
            Get access <span className={styles.version}>✨ 1.0 Release</span>
          </motion.p>
          <br />
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={testimonialVariants}
          >
            <span style={{ display: 'block' }} className={styles.title}>
            Compute with Blockchain-Powered Distributed Servers
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={testimonialVariants}
            className={`${styles.subtitle} opacity-20`}
          >
            Leverage XRP for Faster, More Secure Server Usage
          </motion.p>
          <Image src={Cloud}/>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={featureVariants}
            className={styles.buttons}
          >
            <Link href={"/dashboard"} className={`${styles.button} ${styles.primary}`}>
              Get Started
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://pathway.mintlify.app/api-reference/endpoint/post"
              className={`${styles.button} ${styles.secondary}`}
            >
              Docs
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
