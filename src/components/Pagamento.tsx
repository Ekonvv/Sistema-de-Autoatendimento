import { useState } from "react";
import styles from "./Pagamento.module.css";

type CartItem = {
  title: string;
  price: string;
  qty: number;
};

type PagamentoProps = {
  cart: CartItem[];
  cupomDesconto: number;
  cupomCodigo: string;
  onVoltar: () => void;
  onConfirmar: () => void;
};

function parsePrice(price: string): number {
  return parseFloat(price.replace("R$", "").replace(",", ".").trim());
}

function gerarNumeroNota(): string {
  const now  = new Date();
  const data = now.toLocaleDateString("pt-BR").replace(/\//g, "");
  const hora = now.getTime().toString().slice(-6);
  return `NF-${data}-${hora}`;
}

function gerarProtocolo(): string {
  return Math.random().toString(36).toUpperCase().slice(2, 10);
}

const METODOS = [
  { key: "credito",  label: "Crédito",   icone: "💳" },
  { key: "debito",   label: "Débito",    icone: "💳" },
  { key: "pix",      label: "PIX",       icone: "📱" },
  { key: "dinheiro", label: "Dinheiro",  icone: "💵" },
  { key: "vale",     label: "Vale Ref.", icone: "🎟️" },
];

export function Pagamento({ cart, cupomDesconto, cupomCodigo, onVoltar, onConfirmar }: PagamentoProps) {
  const [metodo, setMetodo]         = useState("credito");
  const [nome, setNome]             = useState("");
  const [cpf, setCpf]               = useState("");
  const [pago, setPago]             = useState(false);
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade]     = useState("");
  const [cvv, setCvv]               = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [chavePix, setChavePix]     = useState("");
  const [protocolo]  = useState(() => gerarProtocolo());
  const [numeroNota] = useState(() => gerarNumeroNota());

  const subtotal = cart.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);
  const desconto = subtotal * (cupomDesconto / 100);
  const total    = subtotal - desconto;
  const agora    = new Date().toLocaleString("pt-BR");

  function podePagar(): boolean {
    if (cart.length === 0) return false;
    if (!nome.trim()) return false;
    if (metodo === "credito" || metodo === "debito") {
      return (
        numeroCartao.replace(/\s/g, "").length === 16 &&
        validade.length === 5 &&
        cvv.length === 3 &&
        nomeCartao.trim().length > 0
      );
    }
    if (metodo === "pix") return chavePix.trim().length > 0;
    return true;
  }

  function formatarCpf(v: string): string {
    const n = v.replace(/\D/g, "").slice(0, 11);
    return n.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function formatarCartao(v: string): string {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatarValidade(v: string): string {
    return v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2");
  }

  function handleConfirmar() {
    if (!podePagar()) return;
    setPago(true);
    setTimeout(() => onConfirmar(), 4000);
  }

  const habilitado = podePagar();

  if (pago) {
    return (
      <div className={styles.pagina}>
        <div className={styles.sucesso}>
          <span className={styles.icone}>✅</span>
          <h2>Pagamento Confirmado!</h2>
          <p>Om Nom ficou feliz! 🍬</p>
          <span className={styles.protocolo}>Protocolo: {protocolo}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pagina}>
      <header className={styles.header}>
        <button className={styles.btnVoltar} onClick={onVoltar}>← Voltar</button>
        <h1>💳 PAGAMENTO</h1>
      </header>

      <div className={styles.conteudo}>
        {/* Formulário */}
        <div className={styles.card}>
          <h2>Dados do Pagamento</h2>

          <div className={styles.campo}>
            <label>Forma de pagamento</label>
            <div className={styles.metodos}>
              {METODOS.map((m) => (
                <button
                  key={m.key}
                  className={`${styles.metodo} ${metodo === m.key ? styles.metodoAtivo : ""}`}
                  onClick={() => setMetodo(m.key)}
                >
                  <span className={styles.metodoIcone}>{m.icone}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {(metodo === "credito" || metodo === "debito") && (
            <>
              <div className={styles.campo}>
                <label>Número do cartão *</label>
                <input type="text" placeholder="0000 0000 0000 0000" maxLength={19}
                  value={numeroCartao} onChange={(e) => setNumeroCartao(formatarCartao(e.target.value))} />
              </div>
              <div className={styles.linhaGrid}>
                <div className={styles.campo}>
                  <label>Validade *</label>
                  <input type="text" placeholder="MM/AA" maxLength={5}
                    value={validade} onChange={(e) => setValidade(formatarValidade(e.target.value))} />
                </div>
                <div className={styles.campo}>
                  <label>CVV *</label>
                  <input type="text" placeholder="000" maxLength={3}
                    value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))} />
                </div>
              </div>
              <div className={styles.campo}>
                <label>Nome no cartão *</label>
                <input type="text" placeholder="Como está no cartão"
                  value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value)} />
              </div>
            </>
          )}

          {metodo === "pix" && (
            <div className={styles.campo}>
              <label>Chave PIX *</label>
              <input type="text" placeholder="CPF, e-mail ou telefone"
                value={chavePix} onChange={(e) => setChavePix(e.target.value)} />
            </div>
          )}

          <div className={styles.campo}>
            <label>Nome *</label>
            <input type="text" placeholder="Seu nome completo"
              value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className={styles.campo}>
            <label>CPF na nota (opcional)</label>
            <input type="text" placeholder="000.000.000-00"
              value={cpf} onChange={(e) => setCpf(formatarCpf(e.target.value))} />
          </div>

          {!habilitado && cart.length > 0 && (
            <p className={styles.aviso}>⚠️ Preencha todos os campos obrigatórios (*) para continuar.</p>
          )}

          <button className={styles.btnConfirmar} onClick={handleConfirmar} disabled={!habilitado}>
            CONFIRMAR PAGAMENTO — R$ {total.toFixed(2).replace(".", ",")}
          </button>
        </div>

        {/* Nota fiscal */}
        <div className={styles.nota}>
          <div className={styles.notaCabecalho}>
            <h2>🍬 CUT THE SHOP</h2>
            <p>CNPJ: 00.000.000/0001-00</p>
            <p>Rua do Om Nom, 42 — São Paulo/SP</p>
            <p className={styles.notaNumero}>{numeroNota} · {agora}</p>
            {nome && <p className={styles.notaCliente}>Cliente: {nome}</p>}
            {cpf  && <p className={styles.notaCpf}>CPF: {cpf}</p>}
          </div>

          <div className={styles.notaItens}>
            <div className={styles.notaItemHeader}>
              <span>Item</span><span>Qtd</span><span>Total</span>
            </div>
            {cart.map((item, i) => (
              <div key={i} className={styles.notaItem}>
                <span className={styles.notaItemNome}>{item.title}</span>
                <span className={styles.notaItemQtd}>{item.qty}x</span>
                <span className={styles.notaItemTotal}>
                  R$ {(parsePrice(item.price) * item.qty).toFixed(2).replace(".", ",")}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.notaTotais}>
            <div className={styles.notaLinha}>
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
            </div>

            {/* Linha do cupom Om Nom */}
            {cupomDesconto > 0 && (
              <div className={styles.notaLinhaCupom}>
                <span>🎉 Cupom Om Nom ({cupomCodigo})</span>
                <span>- R$ {desconto.toFixed(2).replace(".", ",")}</span>
              </div>
            )}


            <div className={styles.notaLinha}>
              <span>Forma de pagamento</span>
              <span>{METODOS.find((m) => m.key === metodo)?.label}</span>
            </div>
            <div className={styles.notaLinhaTotal}>
              <span>TOTAL</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          <div className={styles.notaRodape}>
            <p>Om Nom agradece! 🍬</p>
            <p>Este documento é apenas um comprovante interno.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
