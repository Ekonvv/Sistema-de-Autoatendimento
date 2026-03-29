import styles from "./Cart.module.css";

type CartItem = {
  title: string;
  price: string;
  qty: number;
};

type CartProps = {
  cart: CartItem[];
  onRemove: (index: number) => void;
  onAdjust: (index: number, delta: number) => void;
  onUpdateQty: (index: number, value: string) => void;
};

export function Cart({ cart, onRemove, onAdjust, onUpdateQty }: CartProps) {
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
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #f0f0f0",
                fontSize: "15px",
                gap: "8px",
              }}
            >
              {/* Nome */}
              <span style={{ flex: 1 }}>{item.title}</span>

              {/* Preço */}
              <span
                style={{ color: "#d80000", fontWeight: 700, flexShrink: 0 }}
              >
                {item.price}
              </span>

              {/* Controles de quantidade */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => onAdjust(index, -1)}
                  style={{
                    width: 26,
                    height: 26,
                    background: "#f0f0f0",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  −
                </button>

                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => onUpdateQty(index, e.target.value)}
                  style={{
                    width: 36,
                    height: 26,
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                />

                <button
                  onClick={() => onAdjust(index, 1)}
                  style={{
                    width: 26,
                    height: 26,
                    background: "#d80000",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 700,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>

              {/* Remover */}
              <button
                onClick={() => onRemove(index)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ccc",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: "0 2px",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
                title="Remover"
              >
                ✕
              </button>
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
