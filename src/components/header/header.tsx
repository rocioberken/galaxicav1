import { Link } from "react-router-dom";
import { Toggle } from "../toggle/toggle";
import styles from "./header.module.css";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const user = "Robert";

  return (
    <header className={styles.header}>
      <button
          className={styles.mobileMenuButton}
          onClick={onToggleSidebar}
        >
          ☰
        </button>

      <Link to={`/`} className={styles.logo}>
        <img src="logo.png" alt="Home" />
      </Link>
      

        <div className={styles.toggle}>
          <Toggle />
        </div>
        <div className={styles.user}>
          <img src="user.png" alt="user" />
          <p>Hi, {user}!</p>
        </div>
    </header>
  );
};
