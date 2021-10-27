import { userInfo } from "os";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import illustration from "../assets/images/illustration.svg";
import logoIMG from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/auth.scss";
import "../styles/newroom.scss";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [sala, setSala] = useState("");

  async function handleCreateRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (sala.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: sala,
      authorId: user?.id,
    });

    
    history.push(`/rooms/${firebaseRoom.key}`)
  }

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
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={sala}
              onChange={(e) => setSala(e.target.value)}
            />
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
