import { ReactNode, SetStateAction } from "react";
import "./styles.scss";
import iconClose from "../../assets/images/Path.svg";
import {database} from '../../services/firebase'
import {useHistory} from 'react-router-dom'

interface ModalProps {
  children?: ReactNode;
  showModal: boolean;
  roomId: string;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

export function CompModal({ showModal, setShowModal, children, roomId }: ModalProps) {
const history = useHistory();

  async function handleDeleteRoom(roomId: string){
    await database.ref(`/rooms/${roomId}`).update({
      closedAt: new Date(),
     });
      history.push('/')
  }


  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="container">
            <img src={iconClose} alt="FecharSala" />
            <h1>Encerrar sala</h1>
            <p>Tem certeza que voce deseja encerrar esta sala?</p>
            <div className="modal-buttons">
              <button className="btn-cancel"
              onClick={() => setShowModal(false)}
              
              >Cancelar</button>
              <button className="btn-yes"
              type="button"
              onClick={()=> handleDeleteRoom(roomId)}
              
              >Sim, encerrar</button>
            </div>
            <div className="content">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
