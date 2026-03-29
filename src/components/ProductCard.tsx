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
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p className={styles.preco}>{price}</p>
      <button onClick={onAdd}>ADICIONAR</button>
    </div>
  );
}
