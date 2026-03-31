import styles from "./Cart.module.css";

type CartItem = {
  title: string;
  price: string;
  qty: number;
};

type CartProps = {
  cart: CartItem[];
  paid: boolean;
  cupomDesconto: number; // percentual ex: 10
  cupomCodigo: string;
  onRemove: (index: number) => void;
  onAdjust: (index: number, delta: number) => void;
  onUpdateQty: (index: number, value: string) => void;
  onPay: () => void;
};

function parsePrice(price: string): number {
  return parseFloat(price.replace("R$", "").replace(",", ".").trim());
}

export function Cart({
  cart,
  paid,
  cupomDesconto,
  cupomCodigo,
  onRemove,
  onAdjust,
  onUpdateQty,
  onPay,
}: CartProps) {
  const subtotal = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.qty,
    0,
  );
  const desconto = subtotal * (cupomDesconto / 100);
  const total = subtotal - desconto;

  return (
    <aside className={styles.carrinho}>
      <h2>SEU PEDIDO</h2>

      {/* Confirmado */}
      {paid && (
        <div className={styles.confirmado}>
          <span className={styles.icone}>✅</span>
          <h3>Pedido Confirmado!</h3>
          <p>Om Nom agradece! 🍬</p>
        </div>
      )}

      {/* Vazio */}
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

      {/* Lista */}
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
        <div className={styles.rodape}>
          {/* Linha de subtotal */}
          {cupomDesconto > 0 && cart.length > 0 && (
            <>
              <div className={styles.linhaSub}>
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className={styles.linhaCupom}>
                <span>🎉 Cupom Om Nom ({cupomCodigo})</span>
                <span>- R$ {desconto.toFixed(2).replace(".", ",")}</span>
              </div>
            </>
          )}

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
        </div>
      )}
    </aside>
  );
}
