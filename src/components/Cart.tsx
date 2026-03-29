import styles from "./Cart.module.css";

type CartItem = {
  title: string;
  price: string;
  qty: number;
};

type CartProps = {
  cart: CartItem[];
  paid: boolean;
  onRemove: (index: number) => void;
  onAdjust: (index: number, delta: number) => void;
  onUpdateQty: (index: number, value: string) => void;
  onPay: () => void; // agora navega para a página de pagamento
};

function parsePrice(price: string): number {
  return parseFloat(price.replace("R$", "").replace(",", ".").trim());
}

export function Cart({
  cart,
  paid,
  onRemove,
  onAdjust,
  onUpdateQty,
  onPay,
}: CartProps) {
  const total = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.qty,
    0,
  );

  return (
    <aside className={styles.carrinho}>
      <h2>SEU PEDIDO</h2>

      {/* Tela de confirmação */}
      {paid && (
        <div className={styles.confirmado}>
          <span className={styles.icone}>✅</span>
          <h3>Pedido Confirmado!</h3>
          <p>Estamos preparando tudo com carinho 🍔</p>
        </div>
      )}

      {/* Carrinho vazio */}
      {!paid && cart.length === 0 && (
        <div className={styles.vazio}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            width="70"
            alt="Carrinho vazio"
          />
          <p>Seu carrinho está vazio</p>
        </div>
      )}

      {/* Lista de itens */}
      {!paid && cart.length > 0 && (
        <ul className={styles.lista}>
          {cart.map((item, index) => (
            <li key={index} className={styles.itemLinha}>
              <span className={styles.itemNome}>{item.title}</span>

              <span className={styles.itemPreco}>
                R${" "}
                {(parsePrice(item.price) * item.qty)
                  .toFixed(2)
                  .replace(".", ",")}
              </span>

              <div className={styles.qtdControles}>
                <button
                  className={styles.btnMenos}
                  onClick={() => onAdjust(index, -1)}
                >
                  −
                </button>

                <input
                  className={styles.inputQtd}
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => onUpdateQty(index, e.target.value)}
                />

                <button
                  className={styles.btnMais}
                  onClick={() => onAdjust(index, 1)}
                >
                  +
                </button>
              </div>

              <button
                className={styles.btnRemover}
                onClick={() => onRemove(index)}
                title="Remover"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Rodapé */}
      {!paid && (
        <>
          <div className={styles.total}>
            <span>Total:</span>
            <b>R$ {total.toFixed(2).replace(".", ",")}</b>
          </div>

          <button
            className={styles.pagar}
            onClick={onPay}
            disabled={cart.length === 0}
          >
            IR PARA O PAGAMENTO →
          </button>
        </>
      )}
    </aside>
  );
}
