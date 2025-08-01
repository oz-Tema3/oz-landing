import { Home, Bell, User } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const navItems = [
    { icon: Home, label: "홈", active: true },
    { icon: Bell, label: "알림", active: false },
    { icon: User, label: "내 정보", active: false },
  ];
  return (
    <footer className={styles.footer}>
      <div className={styles.navContainer}>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`${styles.navButton} ${
              item.active ? styles.active : ""
            }`}
          >
            <item.icon size={24} />
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
}
