import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import styles from './layout.module.css';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className={styles.layoutContent}>
        {/* Header arriba */}
        <Header />

        {/* Contenido dinámico: aquí entran tus páginas */}
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  )
}
