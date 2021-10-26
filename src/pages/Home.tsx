import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import illustration from "../assets/images/illustration.svg";
import logoIMG from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle();
    }
    history.push("/rooms/new");
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
          <form action="">
            <input type="text" placeholder="Digite o codigo da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
