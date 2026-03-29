import { useState } from "react";
import { Cart } from "./Cart";
import "./Home.css";
import { Maincard } from "./Maincard";
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
    { title: "Cheeseburger", price: "R$ 12,90", img: "../Cheeseburger.jpg" },
    { title: "Duplo Bacon", price: "R$ 18,90", img: "../DuploBacon.png" },
    {
      title: "Chicken Crispy",
      price: "R$ 14,90",
      img: "../ChickenCrispy.avif",
    },
    { title: "Mega Burguer", price: "R$ 21,90", img: "../MegaBurguer.jpg" },
    { title: "Veggie Smash", price: "R$ 16,90", img: "../VeggieSmash.jpg" },
  ],
  Acompanhamentos: [
    { title: "Batata Frita", price: "R$ 8,90", img: "../BatataFrita.jpg" },
    { title: "Onion Rings", price: "R$ 10,90", img: "../OnionRings.jpg" },
    { title: "Nuggets (8 un)", price: "R$ 11,90", img: "../Nuggets.jpg" },
  ],
  Bebidas: [
    { title: "Refrigerante 400ml", price: "R$ 6,90", img: "../Refri.jpg" },
    { title: "Milk Shake", price: "R$ 14,90", img: "../MilkShake.jpg" },
    { title: "Suco Natural", price: "R$ 9,90", img: "../Suco.jpg" },
  ],
  Sobremesas: [
    { title: "Sorvete 2 Bolas", price: "R$ 9,90", img: "../Sorvete.jpg" },
    { title: "Brownie Quente", price: "R$ 13,90", img: "../Brownie.jpg" },
    { title: "Petit Gateau", price: "R$ 15,90", img: "../PetitGateau.jpg" },
  ],
  Combos: [
    { title: "Combo Classic", price: "R$ 22,90", img: "../ComboClassic.jpg" },
    { title: "Combo Premium", price: "R$ 32,90", img: "../ComboPremium.jpg" },
    { title: "Combo Vegano", price: "R$ 28,90", img: "../ComboVegano.jpg" },
  ],
};

export function Home() {
  const [activeCategory, setActiveCategory] = useState("Lanches");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paid, setPaid] = useState(false);

  const products = PRODUCTS[activeCategory] ?? [];

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

  // Mostra confirmação por 3 segundos e limpa o carrinho
  function handlePay() {
    setPaid(true);
    setTimeout(() => {
      setPaid(false);
      setCart([]);
    }, 3000);
  }

  return (
    <div className="tela">
      <Maincard />

      <div className="conteudo">
        <Sidebar activeCategory={activeCategory} onSelect={setActiveCategory} />

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
          onRemove={removeFromCart}
          onAdjust={adjustQty}
          onUpdateQty={updateQty}
          onPay={handlePay}
        />
      </div>
    </div>
  );
}
