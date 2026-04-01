import { useState } from "react";
import { Cart } from "./Cart";
import "./Home.css";
import { Maincard } from "./Maincard";
import { Pagamento } from "./Pagamento";
import { ProductCard } from "./ProductCard";
import { Sidebar } from "./Sidebar";

type CartItem = {
  title: string;
  price: string;
  qty: number;
};

const PRODUCTS: Record<
  string,
  { title: string; price: string; img: string }[]
> = {
  Lanches: [
    { title: "Cheeseburger", price: "R$ 12,90", img: "./Cheeseburger.png" },
    { title: "Duplo Bacon", price: "R$ 18,90", img: "./DuploBacon.png" },
    { title: "Chicken Crispy", price: "R$ 14,90", img: "./ChickenCrispy.png" },
    { title: "Mega Burguer", price: "R$ 21,90", img: "./MegaBurguer.jpg" },
    { title: "Veggie Smash", price: "R$ 16,90", img: "./Imagens.png" },
  ],
  Acompanhamentos: [
    { title: "Batata Frita", price: "R$ 8,90", img: "./Batata.jpg" },
    { title: "Onion Rings", price: "R$ 10,90", img: "./OnionRings.jpg" },
    { title: "Nuggets (8 un)", price: "R$ 11,90", img: "./Nuggets.jpg" },
  ],
  Bebidas: [
    { title: "Refrigerante 400ml", price: "R$ 6,90", img: "./Refri.jpg" },
    { title: "Água", price: "R$ 14,90", img: "./Imagens.png" },
    { title: "Suco Natural", price: "R$ 9,90", img: "./Suco.jpg" },
  ],
  Sobremesas: [
    { title: "Sorvete 2 Bolas", price: "R$ 9,90", img: "./Sorvete.jpg" },
    { title: "Brownie Quente", price: "R$ 13,90", img: "./Imagens.png" },
    { title: "Petit Gateau", price: "R$ 15,90", img: "./Petit.jpg" },
  ],
  Combos: [
    { title: "Combo Classic", price: "R$ 22,90", img: "./ComboClassic.png" },
    { title: "Combo Premium", price: "R$ 32,90", img: "./ComboPremium.png" },
    { title: "Combo Vegano", price: "R$ 28,90", img: "./ComboVegano.png" },
  ],
};

export function Home() {
  const [activeCategory, setActiveCategory] = useState("Lanches");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paid, setPaid] = useState(false);
  const [pagina, setPagina] = useState<"home" | "pagamento">("home");

  // Cupom do Om Nom
  const [cupomDesconto, setCupomDesconto] = useState(0); // percentual
  const [cupomCodigo, setCupomCodigo] = useState("");

  const products = PRODUCTS[activeCategory] ?? [];
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  function addToCart(title: string, price: string) {
    setCart((prev) => [...prev, { title, price, qty: 1 }]);
  }

  function removeFromCart(index: number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function adjustQty(index: number, delta: number) {
    setCart((prev) =>
      prev
        .map((item, i) =>
          i === index ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }

  function updateQty(index: number, value: string) {
    const qty = parseInt(value);
    if (!isNaN(qty) && qty >= 1) {
      setCart((prev) =>
        prev.map((item, i) => (i === index ? { ...item, qty } : item)),
      );
    } else {
      setCart((prev) => prev.filter((_, i) => i !== index));
    }
  }

  // Chamado pela Sidebar quando Om Nom fecha a boca
  function aplicarCupom(desconto: number, codigo: string) {
    setCupomDesconto(desconto);
    setCupomCodigo(codigo);
  }

  function irParaPagamento() {
    setPagina("pagamento");
  }

  function confirmarPagamento() {
    setPaid(true);
    setCart([]);
    setCupomDesconto(0);
    setCupomCodigo("");
    setPagina("home");
    setTimeout(() => setPaid(false), 3000);
  }

  if (pagina === "pagamento") {
    return (
      <Pagamento
        cart={cart}
        cupomDesconto={cupomDesconto}
        cupomCodigo={cupomCodigo}
        onVoltar={() => setPagina("home")}
        onConfirmar={confirmarPagamento}
      />
    );
  }

  return (
    <div className="tela">
      <Maincard />

      <div className="conteudo">
        {/* Sidebar recebe cartCount e callback do cupom */}
        <Sidebar
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          cartCount={cartCount}
          onAplicarCupom={aplicarCupom}
        />

        <main className="produtos">
          {products.map((p) => (
            <ProductCard
              key={p.title}
              title={p.title}
              price={p.price}
              img={p.img}
              onAdd={() => addToCart(p.title, p.price)}
            />
          ))}
        </main>

        <Cart
          cart={cart}
          paid={paid}
          cupomDesconto={cupomDesconto}
          cupomCodigo={cupomCodigo}
          onRemove={removeFromCart}
          onAdjust={adjustQty}
          onUpdateQty={updateQty}
          onPay={irParaPagamento}
        />
      </div>
    </div>
  );
}
