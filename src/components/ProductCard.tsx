import styles from "./ProductCard.module.css";

type ProductCardProps = {
  title: string;
  price: string;
  img: string;
  onAdd: () => void;
};

export function ProductCard({ title, price, img, onAdd }: ProductCardProps) {
  return (
    <div className={styles.item}>
      <div className={styles.cordaTopo} />

      <div className={styles.imgArea}>
        <img src={img} alt={title} />
      </div>

      <div className={styles.corpo}>
        <h3>{title}</h3>
        <div className={styles.estrelas}>⭐⭐⭐</div>
        <p className={styles.preco}>{price}</p>
        <button className={styles.btnAdicionar} onClick={onAdd}>
          🍬 ADICIONAR
        </button>
      </div>
    </div>
  );
}
