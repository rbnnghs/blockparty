'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Icon from "../../../public/assets/cloudicon.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPricetagsOutline, IoDocumentOutline } from "react-icons/io5";
import { useMediaQuery } from "@mui/material";
import styles from './styles.module.css';

const Header = () => {
  const matches = useMediaQuery('(min-width:768px)');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const renderDesktopNav = () => (
    <div className={`${styles.container}`}>
      <Link href="/" className={`${styles.title}`}>
        <Image src={Icon} width={50} height={50} alt="Cloudblocks" />
        <span>Cloudblocks</span>
      </Link>
      <div className={`${styles.items}`}>
      {pathname === '/dashboard' ? (
          <>
            <Link href="/dashboard" className={`${styles.dashboard}`}>
              Servers
            </Link>
            <Link href="/dashboard/business" className={`${styles.dashboard}`}>
              Tasks
            </Link>
          </>
        ) : (
          <Link href="/dashboard" className={`${styles.dashboard}`}>
            Dashboard
          </Link>
        )}
      </div>
    </div>
  );

  const renderMobileNav = () => (
    <div className={`${styles.container}`}>
      <Link href="/" className={`${styles.title}`}>
        <Image src={Icon} width={50} height={50} alt="Cloudblocks" />
        <span>Cloudblocks</span>
      </Link>
      <DropdownMenuMobile />
    </div>
  );

  const DropdownMenuMobile = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => setShowMenu(!showMenu);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    useEffect(() => {
      if (showMenu) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showMenu]);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowMenu(false);
      }
    };

    return (
      <div className={`${styles.relative} ${styles.inlineblock}`} ref={dropdownRef}>
        <button
          type="button"
          id="options-menu"
          aria-haspopup="true"
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          aria-expanded={showMenu}
          className={styles.menubutton}
        >
          <RxHamburgerMenu />
        </button>

        {showMenu && (
          <div className={`${styles.absolute} ${styles.dropdownmenu}`} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="py-1" role="none">
              {router.pathname === '/dashboard' ? (
                <>
                  <Link href="/server">
                    <span className={`${styles.dropdownitem}`} role="menuitem">
                      Servers
                    </span>
                  </Link>
                  <Link href="/task">
                    <span className={`${styles.dropdownitem}`} role="menuitem">
                      Tasks
                    </span>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard">
                  <span className={`${styles.dropdownitem}`} role="menuitem">
                    Dashboard
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={styles.nav}>
      {matches ? renderDesktopNav() : renderMobileNav()}
    </nav>
  );
}

export default Header;
