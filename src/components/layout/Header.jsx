// components/layout/Header.jsx
"use client";

import { Home } from "lucide-react";
import { useUser } from "@/context/UserContext";
import styles from './Header.module.css';

export default function Header({ title, icon: Icon = Home }) {
  const { user } = useUser();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Icon className={styles.headerIcon} />
        <h1 className={styles.headerTitle}>{title}</h1>
      </div>

      <div className={styles.headerRight}>
        <span className={styles.companyName}>J&P PERIFERICOS S.A.C.</span>

        {user && (
          <div className={styles.userInfo}>
            <p className={styles.welcomeText}>Bienvenido:</p>
            <p className={styles.userName}>{user.name}</p>
            <p className={styles.userRole}>
              {user.role.replace("_", " ").toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
