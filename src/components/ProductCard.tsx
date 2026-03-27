import styles from "./ProductCard.module.css";

type ProductCardProps = {
  title: string;
  price: string;
  img: string;
};

export function ProductCard({ title, price, img }: ProductCardProps) {
  return (
    <div className={styles.item}>
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p className={styles.preco}>{price}</p>
      <button>ADICIONAR</button>
    </div>
  );
}
