import { Link } from "react-router-dom";
import illustration from "../assets/images/illustration.svg";
import logoIMG from "../assets/images/logo.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";
import "../styles/newroom.scss";

export function NewRoom() {
  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustration}
          alt="Ilustracao simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoIMG} alt="Letmeask" />
          <h2>Crie uma nova sala</h2>
          <form action="">
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar Sala</Button>
          </form>
          <p>
            Quer entrar em uma sala ja existente?<Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
