import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";


type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    //user do tipo User ou undefined
    user: User | undefined;
    signInWithGoogle: () => Promise<void>; 
  }

export const AuthContext = createContext({} as AuthContextType)

type AuthContextProviderProps = {
    children: ReactNode; //para a chamada de components é utilizado o react node.
}

export function AuthContextProvider(props: AuthContextProviderProps) {

    
const [user, setUser] = useState<User>( )

useEffect(() => {
 const unsubscribe = auth.onAuthStateChanged(user => {
    if(user) { // verificar se o user está logado,  
      const {displayName, photoURL, uid} = user

         if (!displayName || !photoURL) {
           throw new Error("Missing information from Google Account");

         }
        //setUser setando o uui -> id, displayName -> name, photoURL -> avatar
         setUser({
           id: uid,
           name: displayName,
           avatar: photoURL
         })
       }
    }) // {} -> função a ser executada, [] -> quando a função será executada, vazio para executas apenas uma vez, quando o App() for chamado

    return () => {
      unsubscribe(); // saida da função a fim de evitar erros
    }
}, [])

// signInWithGoogle é uma função assincrona
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    //const result recebe o await do signInWithPopup
    const result = await signInWithPopup(auth, provider);

    
    
    
    if (result.user) {
         const {displayName, photoURL, uid} = result.user

         if (!displayName || !photoURL) {
           throw new Error("Missing information from Google Account");

         }
        //setUser setando o uui -> id, displayName -> name, photoURL -> avatar
         setUser({
           id: uid,
           name: displayName,
           avatar: photoURL
         })
       }
  }


    return(
         /* Setando o user dentro do value de AuthContext e o signInWithGoogle para que seja usado por toda a aplicação */
             <AuthContext.Provider value={{user, signInWithGoogle}}>
               {props.children}
             </AuthContext.Provider>

    )
}