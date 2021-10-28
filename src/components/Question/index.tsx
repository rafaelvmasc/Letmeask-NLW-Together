import "./styles.scss";
import { ReactNode } from "react";

interface QuestionProps {
  content: string;
  author: {
    avatar: string;
    name: string;
  };
  children?: ReactNode;
}

export function Question(question: QuestionProps) {
  return (
    <div className="question-content">
      <p className="question-text">{question.content}</p>
      <div className="user-info">
        <div>
          <img src={question.author.avatar} alt={question.author.name} />
          <span>{question.author.name}</span>
        </div>
        <div className="actions-div">{question.children}</div>
      </div>
    </div>
  );
}
