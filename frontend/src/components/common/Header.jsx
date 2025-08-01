import { MapPin, Plus } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.location}>
        <MapPin color="#3b82f6" size={20} />
        <span className={styles.locationText}>역삼동 근처</span>
      </div>
      <button className={styles.addButton}>
        <Plus size={24} />
      </button>
    </header>
  );
}
