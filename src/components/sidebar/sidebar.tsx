import {
  HomeIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import styles from "./sidebar.module.scss";
import clsx from "clsx";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      <div
        className={clsx(styles.backdrop, { [styles.show]: isOpen })}
        onClick={onClose}
      />

      <nav className={clsx(styles.sidebar, { [styles.open]: isOpen })}>
        <ul>
          <li>
            <NavLink to={`/`} className={styles.navigation}>
              <HomeIcon />
              <span> Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/messages`} className={styles.navigation}>
              <EnvelopeIcon />
              <span> Messages</span>
            </NavLink>
          </li>
        </ul>

        </nav>
    </>
  );
};

