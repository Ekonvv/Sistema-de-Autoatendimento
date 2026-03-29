import styles from "./Cart.module.css";

type CartItem = {
  title: string;
  price: string;
};

type CartProps = {
  cart: CartItem[];
};

export function Cart({ cart }: CartProps) {
  return (
    <aside className={styles.carrinho}>
      <h2>SEU PEDIDO</h2>

      {cart.length === 0 ? (
        <div className={styles.vazio}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            width="70"
            alt="Carrinho vazio"
          />
          <p>Seu carrinho está vazio</p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
          {cart.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #f0f0f0",
                fontSize: "15px",
              }}
            >
              <span>{item.title}</span>
              <span style={{ color: "#d80000", fontWeight: 700 }}>
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.total}>
        <span>Total:</span>
        <b>R$ 0,00</b>
      </div>

      <button className={styles.pagar}>IR PARA O PAGAMENTO</button>
    </aside>
  );
}
