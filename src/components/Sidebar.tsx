import { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.css";

const CATEGORIAS = [
  { key: "Lanches", label: "🍔 Lanches" },
  { key: "Acompanhamentos", label: "🍟 Acompanhamentos" },
  { key: "Bebidas", label: "🥤 Bebidas" },
  { key: "Sobremesas", label: "🍦 Sobremesas" },
  { key: "Combos", label: "🎁 Combos" },
];

function gerarCupom(): string {
  return "NOM" + Math.random().toString(36).toUpperCase().slice(2, 7);
}

function OmNomAnimado({ bocaAberta }: { bocaAberta: number }) {
  const angulo = bocaAberta * 42;
  const rad = (angulo * Math.PI) / 180;

  const cx = 65, cy = 65, r = 50;
  const x1 = cx + r * Math.cos(Math.PI + rad);
  const y1 = cy + r * Math.sin(Math.PI + rad);
  const x2 = cx + r * Math.cos(Math.PI - rad);
  const y2 = cy - r * Math.sin(Math.PI - rad);

  const bocaPath =
    angulo < 2
      ? `M ${cx - r} ${cy} Q ${cx} ${cy + 20} ${cx + r} ${cy}`
      : `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${cx} ${cy} Z`;

  const sorriso =
    angulo < 2
      ? `M ${cx - 20} ${cy + 5} Q ${cx} ${cy + 18} ${cx + 20} ${cy + 5}`
      : null;

  return (
    <svg
      viewBox="0 0 130 130"
      className={styles.omNomSvg}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="65" cy="126" rx="30" ry="6" fill="rgba(0,0,0,0.12)" />
      <ellipse cx="65" cy="95" rx="36" ry="30" fill="#5aaa18" />
      <circle cx="65" cy="60" r="48" fill="#6abf2e" />
      <ellipse cx="50" cy="32" rx="12" ry="7" fill="rgba(255,255,255,0.2)" transform="rotate(-20,50,32)" />
      <ellipse cx="65" cy="102" rx="24" ry="18" fill="#86d43a" />
      <circle cx="45" cy="52" r="14" fill="white" />
      <circle cx="47" cy="54" r="8" fill="#1a3a00" />
      <circle cx="50" cy="50" r="3" fill="white" />
      <circle cx="85" cy="52" r="14" fill="white" />
      <circle cx="87" cy="54" r="8" fill="#1a3a00" />
      <circle cx="90" cy="50" r="3" fill="white" />

      {bocaAberta > 0.5 ? (
        <>
          <path d="M32 40 Q45 36 54 42" stroke="#3a7a00" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M76 42 Q85 36 98 40" stroke="#3a7a00" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M32 42 Q45 38 54 42" stroke="#3a7a00" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M76 42 Q85 38 98 42" stroke="#3a7a00" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}

      <clipPath id="clipCabeca">
        <circle cx="65" cy="60" r="47" />
      </clipPath>

      <g clipPath="url(#clipCabeca)">
        {angulo >= 2 ? (
          <>
            <path d={bocaPath} fill="#1a1a00" />
            <ellipse
              cx={cx}
              cy={cy + (angulo / 42) * 22}
              rx={14 * (angulo / 42)}
              ry={8 * (angulo / 42)}
              fill="#e53935"
            />
          </>
        ) : (
          <path d={sorriso!} stroke="#3a7a00" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
      </g>

      <ellipse cx="30" cy="68" rx="10" ry="7" fill="rgba(255,120,100,0.25)" />
      <ellipse cx="100" cy="68" rx="10" ry="7" fill="rgba(255,120,100,0.25)" />
      <ellipse cx="18" cy="42" rx="9" ry="13" fill="#5aaa18" />
      <ellipse cx="18" cy="42" rx="5" ry="8" fill="#86d43a" />
      <ellipse cx="112" cy="42" rx="9" ry="13" fill="#5aaa18" />
      <ellipse cx="112" cy="42" rx="5" ry="8" fill="#86d43a" />
    </svg>
  );
}

type SidebarProps = {
  activeCategory: string;
  onSelect: (category: string) => void;
  cartCount: number;
  onAplicarCupom: (desconto: number, codigo: string) => void;
};

const MAX_ITENS = 5;

export function Sidebar({ activeCategory, onSelect, cartCount, onAplicarCupom }: SidebarProps) {
  const [cupom, setCupom] = useState<string | null>(null);
  const [bocaAberta, setBocaAberta] = useState(1);

  // useRef para evitar que o cupom seja gerado mais de uma vez
  const cupomGeradoRef = useRef(false);
  // useRef estável para onAplicarCupom (evita re-runs desnecessários)
  const onAplicarCupomRef = useRef(onAplicarCupom);
  useEffect(() => { onAplicarCupomRef.current = onAplicarCupom; }, [onAplicarCupom]);

  useEffect(() => {
    const nivel = Math.min(cartCount, MAX_ITENS);

    // Atualiza abertura da boca
    setBocaAberta(1 - nivel / MAX_ITENS);

    // Reseta se carrinho vazio
    if (cartCount === 0) {
      setCupom(null);
      cupomGeradoRef.current = false;
      return;
    }

    // Gera cupom uma única vez quando atinge MAX_ITENS
    if (nivel >= MAX_ITENS && !cupomGeradoRef.current) {
      cupomGeradoRef.current = true;
      const codigo = gerarCupom();
      setCupom(codigo);
      setTimeout(() => {
        onAplicarCupomRef.current(10, codigo);
      }, 600);
    }
  }, [cartCount]); // ✅ só depende de cartCount — refs são estáveis

  const textoBalao =
    cartCount === 0
      ? "Estou com fome! 😋"
      : cartCount < MAX_ITENS / 2
        ? "Hmm, que delícia! 🍬"
        : cartCount < MAX_ITENS
          ? "Mais! Mais! 😍"
          : cupom
            ? "NHAC! Obrigado! 🎉"
            : "NOM NOM NOM! 😋";

  const fomePct = Math.min((cartCount / MAX_ITENS) * 100, 100);

  return (
    <aside className={styles.sidebar}>
      <p className={styles.labelSecao}>Categorias</p>

      {CATEGORIAS.map((cat) => (
        <div
          key={cat.key}
          className={`${styles.categoria} ${activeCategory === cat.key ? styles.ativa : ""}`}
          onClick={() => onSelect(cat.key)}
        >
          {cat.label}
        </div>
      ))}

      <div className={styles.omNomContainer}>
        <div className={styles.balao}>{textoBalao}</div>

        <OmNomAnimado bocaAberta={bocaAberta} />

        <p className={styles.fomeLabel}>Fome do Om Nom</p>
        <div className={styles.fomeBar}>
          <div className={styles.fomeFill} style={{ width: `${fomePct}%` }} />
        </div>

        {cupom && (
          <div className={styles.cupomContainer}>
            <p className={styles.cupomTitulo}>🎉 CUPOM GERADO!</p>
            <p className={styles.cupomDesconto}>-10%</p>
            <span className={styles.cupomCodigo}>{cupom}</span>
            <p className={styles.cupomDesc}>Aplicado automaticamente ✅</p>
          </div>
        )}
      </div>
    </aside>
  );
}