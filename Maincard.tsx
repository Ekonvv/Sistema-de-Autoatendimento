import styles from "./Maincard.module.css";

function OmNom({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
      }}
    >
      {/* Sombra corporal */}
      <ellipse cx="35" cy="67" rx="18" ry="4" fill="rgba(0,0,0,0.15)" />
      {/* Corpo */}
      <ellipse cx="35" cy="46" rx="24" ry="22" fill="#5aaa18" />
      {/* Cabeça */}
      <circle cx="35" cy="30" r="24" fill="#6abf2e" />
      {/* Reflexo na cabeça */}
      <ellipse
        cx="27"
        cy="18"
        rx="8"
        ry="5"
        fill="rgba(255,255,255,0.18)"
        transform="rotate(-20,27,18)"
      />
      {/* Barriga clara */}
      <ellipse cx="35" cy="50" rx="16" ry="12" fill="#86d43a" />
      {/* Olho esquerdo — branco */}
      <circle cx="24" cy="26" r="9" fill="white" />
      <circle
        cx="24"
        cy="26"
        r="9"
        fill="white"
        stroke="#ccc"
        strokeWidth="0.5"
      />
      {/* Pupila esquerda */}
      <circle cx="25" cy="27" r="5.5" fill="#1a3a00" />
      <circle cx="26" cy="25" r="2" fill="white" />
      {/* Olho direito */}
      <circle cx="46" cy="26" r="9" fill="white" />
      <circle
        cx="46"
        cy="26"
        r="9"
        fill="white"
        stroke="#ccc"
        strokeWidth="0.5"
      />
      {/* Pupila direita */}
      <circle cx="47" cy="27" r="5.5" fill="#1a3a00" />
      <circle cx="48" cy="25" r="2" fill="white" />
      {/* Sobrancelhas */}
      <path
        d="M17 18 Q24 14 31 18"
        stroke="#3a7a00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M39 18 Q46 14 53 18"
        stroke="#3a7a00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Boca aberta feliz */}
      <path d="M20 38 Q35 52 50 38" fill="#1a1a00" />
      {/* Língua */}
      <ellipse cx="35" cy="46" rx="8" ry="5" fill="#e53935" />
      {/* Dentes */}
      <rect x="25" y="37" width="7" height="6" rx="2" fill="white" />
      <rect x="38" y="37" width="7" height="6" rx="2" fill="white" />
      {/* Orelhinhas */}
      <ellipse cx="12" cy="20" rx="6" ry="8" fill="#5aaa18" />
      <ellipse cx="12" cy="20" rx="3" ry="5" fill="#86d43a" />
      <ellipse cx="58" cy="20" rx="6" ry="8" fill="#5aaa18" />
      <ellipse cx="58" cy="20" rx="3" ry="5" fill="#86d43a" />
    </svg>
  );
}

export function Maincard() {
  return (
    <header className={styles.topo}>
      <span className={styles.estrelas}>⭐</span>
      <OmNom />
      <div className={styles.info}>
        <h1>CUT THE SHOP</h1>
        <p>Alimente o Om Nom! 🍬</p>
      </div>
      <OmNom flip />
      <span className={styles.estrelas}>⭐</span>
    </header>
  );
}
