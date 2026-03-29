import { useState } from "react";
import styles from "./Sidebar.module.css";

const CATEGORIAS = [
  { key: "Lanches", label: "🍔 Lanches" },
  { key: "Acompanhamentos", label: "🍟 Acompanhamentos" },
  { key: "Bebidas", label: "🥤 Bebidas" },
  { key: "Sobremesas", label: "🍦 Sobremesas" },
  { key: "Combos", label: "🎁 Combos" },
];

type SidebarProps = {
  activeCategory: string;
  onSelect: (category: string) => void;
};

export function Sidebar({ activeCategory, onSelect }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      {CATEGORIAS.map((cat) => (
        <div
          key={cat.key}
          className={`${styles.categoria} ${
            activeCategory === cat.key ? styles.ativa : ""
          }`}
          onClick={() => onSelect(cat.key)}
        >
          {cat.label}
        </div>
      ))}
    </aside>
  );
}
