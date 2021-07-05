import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import "../styles/styleFooterForm.scss";
import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      return toast.error("Sala inexistente 😢", {
        id: roomCode,
        style: {
          width: "auto",
        },
      });
    }

    if (roomRef.val().closedAt) {
      return toast.error("Sala fechada 😢", {
        id: roomCode,
        style: {
          width: "auto",
        },
      });
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src="./LogoOI.png" alt="Ilustração simbolo da OI" />
        <div>
          <strong>OI viver sem fronteiras.</strong>
          <p>Preencha o formulário e saiba mais.</p>
        </div>
        <div>
          <strong className="subtitulo">
            OI - Avenida Brasil - Ji-Paraná RO
          </strong>
          <p>Contato: (69) 9 8414-1414</p>
          <p>SAC: 0800 031 0800</p>
        </div>
      </aside>

      <main>
        <div className="main-content">
          <img className="logoOI" src="./LogoOI.png" alt="Telefonia OI" />
          {/* <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button> */}
          <Toaster position="top-right" reverseOrder={false} />

          <div className="separator">
            Deixe seus dados, entraremos em contado
          </div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              id="nome"
              name="userName"
              placeholder="Digite o seu nome"
              onChange={(e) => setRoomCode(e.target.value)}
              // value={userName}
            />

            <input
              type="text"
              placeholder="(99) 9-9999-9999"
              id="tele"
              onChange={(e) => setRoomCode(e.target.value)}
              // value={telefone}
            />
            <input
              type="mail"
              placeholder="Digite seu e-mail"
              onChange={(e) => setRoomCode(e.target.value)}
            />

            <input
              type="number"
              placeholder="CPF"
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <div className="footeForm">
              <div className="left">
                <input
                  type="text"
                  className="inputLeft"
                  placeholder="Rua"
                  onChange={(e) => setRoomCode(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  onChange={(e) => setRoomCode(e.target.value)}
                />
              </div>
              <div className="right">
                <input
                  type="text"
                  placeholder="Número"
                  onChange={(e) => setRoomCode(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  onChange={(e) => setRoomCode(e.target.value)}
                />
              </div>
            </div>
            <div className="buttoncheck">
              <input className="botaoCheck" type="checkbox" id="check" />
              <label className="check" htmlFor="check">
                Aceito os Termos de Privacidade.
              </label>
            </div>

            <Button type="submit">Enviar</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
