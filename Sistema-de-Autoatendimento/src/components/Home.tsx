
import { Cart } from "./Cart";
import "./Home.css";
import { Maincard } from "./Maincard";
import { ProductCard } from "./ProductCard";
import { Sidebar } from "./Sidebar";

export function Home() {
  return (
    <div className="tela">
      <Maincard />

      <div className="conteudo">
        <Sidebar />

        <main className="produtos">
          <ProductCard
            title="Cheeseburger"
            price="R$ 12,90"
            img="https://via.placeholder.com/300x180"
          />
          <ProductCard
            title="Duplo Bacon"
            price="R$ 18,90"
            img="https://via.placeholder.com/300x180"
          />
          <ProductCard
            title="Chicken Crispy"
            price="R$ 14,90"
            img="https://via.placeholder.com/300x180"
          />
          <ProductCard
            title="Mega Burguer"
            price="R$ 21,90"
            img="https://via.placeholder.com/300x180"
          />
        </main>

        <Cart />
      </div>
    </div>
  );
}