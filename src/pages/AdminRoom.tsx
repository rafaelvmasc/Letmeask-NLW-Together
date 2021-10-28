import logoLetmeask from "../assets/images/logo.svg";
import deleteImg from '../assets/images/delete.svg'

import "../styles/admin.scss";

import { FormEvent, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { CompModal } from "../components/Modal";

type CodeRoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<CodeRoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const [isModalVisible, setIsModalVisible] = useState(false);


  async function handleDeleteQuestion(questionId : string){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
    alert("Pergunta enviada!");
  }

  return (
    <div id="page-room">
      <CompModal roomId={roomId} showModal={isModalVisible} setShowModal={setIsModalVisible} ></CompModal>
      <header>
        <div className="content">
          <img src={logoLetmeask} alt="Logo da Letmeask" />
          <div className="buttons-admin">
            <RoomCode code={roomId} />

            <Button
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          <span>{questions.length} perguntas</span>
        </div>

        {questions.map((question) => {
          return (
            <Question
              content={question.content}
              author={question.author}
              key={question.id}
            >
            <button 
            type="button"
            onClick={()=> handleDeleteQuestion(question.id)}
            >
              <img src={deleteImg} alt="Remover pergunta" />
            </button>
            </Question>
          );
        })}
      </main>
    </div>
  );
}
