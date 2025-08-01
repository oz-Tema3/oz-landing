import { MessageSquare } from "lucide-react";
import { timeSince } from "../../utils/date";
import styles from "./ActivityCard.module.css";

export default function ActivityCard({ activity }) {
  const { user, content, hashtags, createdAt } = activity;
  return (
    <div className={styles.card}>
      <div className={styles.userInfo}>
        <img
          src={`https://i.pravatar.cc/40?u=${user.nickname}`}
          alt="profile"
          className={styles.profileImage}
        />
        <div>
          <p className={styles.nickname}>{user.nickname}</p>
          <p className={styles.meta}>{timeSince(createdAt)} • 1.2km 근처</p>
        </div>
      </div>
      <p className={styles.content}>{content}</p>
      <div className={styles.hashtags}>
        {hashtags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <button className={styles.connectButton}>
        <MessageSquare size={20} />
        같이할래요
      </button>
    </div>
  );
}
