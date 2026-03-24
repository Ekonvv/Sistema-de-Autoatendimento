import styles from "./Cart.module.css";

export function Cart() {
  return (
    <aside className={styles.carrinho}>
      <h2>SEU PEDIDO</h2>

      <div className={styles.vazio}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          width="70"
          alt="Carrinho vazio"
        />
        <p>Seu carrinho está vazio</p>
      </div>

      <div className={styles.total}>
        <span>Total:</span>
        <b>R$ 0,00</b>
      </div>

      <button className={styles.pagar}>IR PARA O PAGAMENTO</button>
    </aside>
  );
}