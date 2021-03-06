import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIcon from "../assets/images/google-icon.svg"
import {Button} from "../components/Button"
import { useHistory } from "react-router-dom"
import "../styles/auth.scss"
import { useAuth } from "../hooks/useAuth"

export function Home() {


    const history = useHistory();
    
    const { user, signInWithGoogle } = useAuth()


    // handleCreateRoom é uma função assincrona, o user não estiver logado, ele aguarda o signInWithGoogle para continuar o fluxo 
    async function handleCreateRoom() {

        if(!user) {
            await signInWithGoogle()
        }

        history.push("/rooms/new")
        
       

    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIcon} alt="logo do Google"/>
                        Crie sua sala com o Google  
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                        type="text"
                        placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}