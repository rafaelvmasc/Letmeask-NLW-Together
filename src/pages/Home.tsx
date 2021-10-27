import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

import illustration from "../assets/images/illustration.svg";
import logoIMG from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";
import React from "react";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const [salaCode, setSalaCode] = useState("");
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (salaCode.trim() === "") {
      return;
    }
    const roomRef = await database.ref(`rooms/${salaCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }
    history.push(`/rooms/${salaCode}`);
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

          <button onClick={handleCreateRoom} className="btn-authgoogle">
            <img src={googleIconImg} alt="" />
            Crie sua sala com o google
          </button>

          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o codigo da sala"
              value={salaCode}
              onChange={(e) => setSalaCode(e.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
