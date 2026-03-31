import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";

const CATEGORIAS = [
  { key: "Lanches", label: "🍔 Lanches" },
  { key: "Acompanhamentos", label: "🍟 Acompanhamentos" },
  { key: "Bebidas", label: "🥤 Bebidas" },
  { key: "Sobremesas", label: "🍦 Sobremesas" },
  { key: "Combos", label: "🎁 Combos" },
];

// Gera código de cupom aleatório
function gerarCupom(): string {
  return "NOM" + Math.random().toString(36).toUpperCase().slice(2, 7);
}

// Om Nom SVG com abertura de boca controlada por prop (0 = fechado, 1 = aberto)
function OmNomAnimado({ bocaAberta }: { bocaAberta: number }) {
  // Ângulo da boca: 0 = fechada, 40 = bem aberta
  const angulo = bocaAberta * 42;
  const rad = (angulo * Math.PI) / 180;

  // Pontos da boca em arco
  const cx = 65,
    cy = 65,
    r = 50;
  const x1 = cx + r * Math.cos(Math.PI + rad);
  const y1 = cy + r * Math.sin(Math.PI + rad);
  const x2 = cx + r * Math.cos(Math.PI - rad);
  const y2 = cy - r * Math.sin(Math.PI - rad);

  // Boca fechada ou com abertura
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
      {/* Sombra */}
      <ellipse cx="65" cy="126" rx="30" ry="6" fill="rgba(0,0,0,0.12)" />

      {/* Corpo */}
      <ellipse cx="65" cy="95" rx="36" ry="30" fill="#5aaa18" />

      {/* Cabeça */}
      <circle cx="65" cy="60" r="48" fill="#6abf2e" />

      {/* Reflexo */}
      <ellipse
        cx="50"
        cy="32"
        rx="12"
        ry="7"
        fill="rgba(255,255,255,0.2)"
        transform="rotate(-20,50,32)"
      />

      {/* Barriga */}
      <ellipse cx="65" cy="102" rx="24" ry="18" fill="#86d43a" />

      {/* Olho esquerdo */}
      <circle cx="45" cy="52" r="14" fill="white" />
      <circle cx="47" cy="54" r="8" fill="#1a3a00" />
      <circle cx="50" cy="50" r="3" fill="white" />

      {/* Olho direito */}
      <circle cx="85" cy="52" r="14" fill="white" />
      <circle cx="87" cy="54" r="8" fill="#1a3a00" />
      <circle cx="90" cy="50" r="3" fill="white" />

      {/* Sobrancelhas — franzidas se com fome, normais se feliz */}
      {bocaAberta > 0.5 ? (
        <>
          <path
            d="M32 40 Q45 36 54 42"
            stroke="#3a7a00"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M76 42 Q85 36 98 40"
            stroke="#3a7a00"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M32 42 Q45 38 54 42"
            stroke="#3a7a00"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M76 42 Q85 38 98 42"
            stroke="#3a7a00"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {/* Boca (clip para ficar dentro da cabeça) */}
      <clipPath id="clipCabeca">
        <circle cx="65" cy="60" r="47" />
      </clipPath>

      <g clipPath="url(#clipCabeca)">
        {angulo >= 2 ? (
          <>
            {/* Interior boca */}
            <path d={bocaPath} fill="#1a1a00" />
            {/* Língua */}
            <ellipse
              cx={cx}
              cy={cy + (angulo / 42) * 22}
              rx={14 * (angulo / 42)}
              ry={8 * (angulo / 42)}
              fill="#e53935"
            />
          </>
        ) : (
          /* Sorriso fechado */
          <path
            d={sorriso!}
            stroke="#3a7a00"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}
      </g>

      {/* Bochechas rosadas */}
      <ellipse cx="30" cy="68" rx="10" ry="7" fill="rgba(255,120,100,0.25)" />
      <ellipse cx="100" cy="68" rx="10" ry="7" fill="rgba(255,120,100,0.25)" />

      {/* Orelhas */}
      <ellipse cx="18" cy="42" rx="9" ry="13" fill="#5aaa18" />
      <ellipse cx="18" cy="42" rx="5" ry="8" fill="#86d43a" />
      <ellipse cx="112" cy="42" rx="9" ry="13" fill="#5aaa18" />
      <ellipse cx="112" cy="42" rx="5" ry="8" fill="#86d43a" />
    </svg>
  );
}

// ─────────────────────────────────────────────
type SidebarProps = {
  activeCategory: string;
  onSelect: (category: string) => void;
  cartCount: number; // total de itens no carrinho
  onAplicarCupom: (desconto: number, codigo: string) => void;
};

const MAX_ITENS = 5; // quantidade de itens para fechar a boca totalmente

export function Sidebar({
  activeCategory,
  onSelect,
  cartCount,
  onAplicarCupom,
}: SidebarProps) {
  const [cupom, setCupom] = useState<string | null>(null);
  const [cupomUsado, setCupomUsado] = useState(false);
  const [bocaAberta, setBocaAberta] = useState(1); // começa com boca aberta (com fome)

  // Quando o carrinho muda, atualiza boca e verifica se gera cupom
  useEffect(() => {
    const nivel = Math.min(cartCount, MAX_ITENS);
    // boca: 1 = totalmente aberta (vazio), 0 = fechada (cheio)
    setBocaAberta(1 - nivel / MAX_ITENS);

    // Gera cupom quando a boca fecha totalmente
    if (nivel >= MAX_ITENS && !cupomUsado) {
      if (!cupom) {
        setCupom(gerarCupom());
        // Aplica desconto automático de 10%
        setTimeout(() => {
          const codigo = gerarCupom();
          setCupom(codigo);
          onAplicarCupom(10, codigo);
        }, 600);
      }
    }

    // Reseta cupom se esvaziar o carrinho
    if (cartCount === 0) {
      setCupom(null);
      setCupomUsado(false);
    }
  }, [cartCount]);

  // Texto do balão conforme o estado
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

      {/* Om Nom animado */}
      <div className={styles.omNomContainer}>
        {/* Balão de fala */}
        <div className={styles.balao}>{textoBalao}</div>

        {/* Om Nom */}
        <OmNomAnimado bocaAberta={bocaAberta} />

        {/* Barra de fome */}
        <p className={styles.fomeLabel}>Fome do Om Nom</p>
        <div className={styles.fomeBar}>
          <div className={styles.fomeFill} style={{ width: `${fomePct}%` }} />
        </div>

        {/* Cupom gerado automaticamente */}
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
