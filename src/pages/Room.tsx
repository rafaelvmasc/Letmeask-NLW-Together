import logoLetmeask from "../assets/images/logo.svg";

import { FormEvent, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<
  string,
  {
    author: { name: string; avatar: string };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
  }
>;

type Question = {
  id: string;
  author: { name: string; avatar: string };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
};

type CodeRoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<CodeRoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const roomId = params.id;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, valor]) => {
          return {
            id: key,
            content: valor.content,
            author: valor.author,
            isHighlighted: valor.isHighlighted,
            isAnswered: valor.isAnswered,
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      console.log(parsedQuestions[1]);
    });
  }, [roomId]);

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
      <header>
        <div className="content">
          <img src={logoLetmeask} alt="Logo da Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          <span>{questions.length} perguntas</span>
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que voce quer perguntar"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <span>Logged in as</span>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button> faca seu login</button>.
              </span>
            )}
            <Button disabled={!user} type="submit">
              Enviar pergunta
            </Button>
          </div>
        </form>
        {questions.map((question) => {
          return (
            <div className="question-content">
              <p className="question-text">{question.content}</p>
              <div className="user-info">
                <img src={question.author.avatar} alt={question.author.name} />
                <span>{question.author.name}</span>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
