import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Icon from "../Icon/icon";
import headerStyle from "@/components/Header/styles.module.css";

// Import the CSSProperties type
// import { CSSProperties } from "react";

// Define a custom CSS class for the footer
// const footerStyle: CSSProperties = {
//   position: 'relative',
//   backgroundColor: 'white',
// };

// // Define styles for the pseudo-elements
// const pseudoElementStyle: CSSProperties = {
//   content: '""',
//   position: 'absolute',
//   width: '300px', // Adjust the size as needed
//   height: '300px', // Adjust the size as needed
//   borderRadius: '50%',
//   filter: 'blur(24px)', // Adjust the blur as needed
//   opacity: '0.25', // Adjust the opacity as needed
// };

// // Style for the orange circle
// const orangeCircleStyle: CSSProperties = {
//   ...pseudoElementStyle,
//   backgroundColor: 'blue',
//   top: '-20px', // Adjust the position as needed
//   left: '50px', // Adjust the position as needed
// };

// // Style for the pink circle
// const pinkCircleStyle: CSSProperties = {
//   ...pseudoElementStyle,
//   backgroundColor: 'pink',
//   top: '80px', // Adjust the position as needed
//   right: '-50px', // Adjust the position as needed
// };

export function Footer() {
  return (
    <footer
      className={`py-4 ${styles.footer}`}
      // style={footerStyle}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left text-black relative">
        {/* Orange circle */}
        {/* <div style={orangeCircleStyle}></div> */}

        <div className="md:flex-shrink-0 mb-4 md:mb-0">
          <Link href={"/"} className={`${headerStyle.title} ${headerStyle.hover}`}>
            <Icon /> Pathway
          </Link>
        </div>
        
        {/* Pink circle */}
        {/* <div style={pinkCircleStyle}></div> */}

        {/* <div className="text-center md:text-left">
          <p>&copy; 2023 Your Company Name. All Rights Reserved.</p>
          <p>1234 Example Street, City, Country</p>
        </div> */}
<div className="flex items-center justify-center space-x-2 md:space-x-4 lg:justify-start">
{/* <span
            className="text-black hover:text-gray-400 mx-0 transition duration-300"
          >
          <ProductHuntBadge/>
          </span> */}
  <div className="flex items-center justify-center w-2 h-2 bg-green-500 rounded-full relative">
    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute"></div>
  </div>
    <div className="text-gray-600 font-medium">API&apos;s Running</div>
</div>
<div className="mt-4 md:mt-0">
          <Link 
            href="/pricing"
            className="text-black hover:text-gray-400 mx-2 transition duration-300"
          >
            Pricing
          </Link>
          <Link 
          target="_blank"
          rel="noopener noreferrer"
            href="https://pathway.mintlify.app/"
            className="text-black hover:text-gray-400 mx-2 transition duration-300"
          >
            Docs
          </Link>
          <a
            href="/legal"
            className="text-black hover:text-gray-400 mx-2 transition duration-300"
          >
            Legal
          </a>
</div>
      </div>
    </footer>
  );
}
