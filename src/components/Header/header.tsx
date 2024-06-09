'use client'

import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import Icon from "../../../public/assets/cloudicon.png";
// import { useSession, signOut, signIn } from "next-auth/react";
import Sidebar from "../Sidebar";
import {RxHamburgerMenu, RxCross2} from "react-icons/rx";
import Image from "next/image";
import { FaChevronDown, FaTools, FaCreditCard, FaSignOutAlt } from 'react-icons/fa'; // Import desired icons
import { MdGrid3X3, MdOutlineSpa, MdOutlineSpaceDashboard, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { MdPriceCheck } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { IoDocumentOutline, IoPricetagsOutline } from "react-icons/io5";
import { CiDatabase, CiLogin } from "react-icons/ci";
import { useMediaQuery } from "@mui/material";

export function Header() {
  // const { data: session, status } = useSession();
  const matches = useMediaQuery('(min-width:768px)');

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const renderDesktopNav = () => (
    <div className={`${styles.container} ${styles.flex} ${styles.between} ${styles.py}`}>
      <Link href={"/"} className={`${styles.title} ${styles.hover}`}>
        <Image src={Icon} width={50} height={100} /> Cloudblocks
      </Link>
      <div className={`${styles.flex} ${styles.items}`}>
        <Link href="/pricing" className={`${styles.link} ${styles.hover}`}>
          Pricing
        </Link>
        <Link     target="_blank"
    rel="noopener noreferrer"  href="https://pathway.mintlify.app/" className={`${styles.link} ${styles.hover}`}>
          Docs
        </Link>

        {status === "authenticated" ? (
        <Link href="/dashboard" className={`${styles.dashboard} ${styles.hover}`}>
          Dashboard
        </Link>
      ) : (
        <Link
        href={"/signin"}
        className={`${styles.dashboard} ${styles.hover}`}
        >
          Sign In
        </Link>
      )}
      </div>
    </div>
  );

  const renderMobileNav = () => (
    <div className={`${styles.container} ${styles.flex} ${styles.between} ${styles.py}`}>
      <Link href={"/"} className={`${styles.title} ${styles.hover}`}>
        <Icon  /> Cloudblocks
      </Link>
      <DropdownMenuMobile />
    </div>
  );

const DropdownMenuMobile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);  // Specify that this ref attaches to a div element

  // Function to toggle menu visibility
  const toggleMenu = () => setShowMenu(!showMenu);

  // Function to close the dropdown if clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMenu(false);
    }
};

  // Handle outside clicks for open dropdown
  useEffect(() => {
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listeners on unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

    // Function to enhance UX for keyboard users
const handleKeyDown = (e: { key: string; }) => {
  if (e.key === 'Escape') {
    setShowMenu(false);
  }
};


return (
  <div className={`relative inline-block ${styles.linkDM}`} ref={dropdownRef as React.RefObject<HTMLDivElement>}>
    <button 
      type="button" 
      id="options-menu" 
      aria-haspopup="true" 
      onClick={toggleMenu} 
      onKeyDown={handleKeyDown} // new line for keyboard event
      aria-expanded={showMenu} // Reflect the current state of the menu
    >
{status === "authenticated" ? (
      <span className="text-black text-2xl focus:outline-none">
      <RxHamburgerMenu />
    </span> 
  ) : (
      <button className="text-black text-2xl focus:outline-none">
        <RxHamburgerMenu />
      </button> 
        )
}

    </button>

    {showMenu && (
      <div className="origin-top-right absolute right-0 rounded-md bg-white ring-1 ring-black ring-opacity-10 divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div className="px-0">
          <Link href="/pricing">
            <span className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <IoPricetagsOutline className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Pricing</span>
            </span>
          </Link>
          <Link target="_blank"
    rel="noopener noreferrer" href="https://pathway.mintlify.app/">
            <span className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <IoDocumentOutline className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Docs</span>
            </span>
          </Link>
          <Link href={status === "authenticated" ? "/dashboard" : "/signin"}>
          {/* <span className={`flex items-center ${styles.dashboard_M} px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`} role="menuitem">
          <MdOutlineSpaceDashboard className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
    {status === "authenticated" ? 'Dashboard' : 'Sign In'}
</span> */}
</Link>
        </div>
      </div>
    )}
  </div>
);
};

  return (
    <nav className={`${styles.nav}`}>
      {matches ? renderDesktopNav() : renderMobileNav()}
    </nav>
  );
}

export default Header;