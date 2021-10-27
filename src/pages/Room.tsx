import logoLetmeask from "../assets/images/logo.svg";

import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";


type CodeRoomParams ={
    id: string;
}

export function Room() {
    const params = useParams<CodeRoomParams>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoLetmeask} alt="Logo da Letmeask" />
          <RoomCode code={params.id} />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form>
          <textarea placeholder="O que voce quer perguntar" />
          <div className="form-footer">
            <span>
              Para enviar uma pergunta, <button> faca seu login</button>
            </span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
