import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={`${styles.categoria} ${styles.ativa}`}>🍔 Lanches</div>
      <div className={styles.categoria}>🍟 Combos</div>
      <div className={styles.categoria}>🥤 Bebidas</div>
      <div className={styles.categoria}>🍦 Sobremesas</div>
    </aside>
  );
}
