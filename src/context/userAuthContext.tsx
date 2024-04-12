import { User, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebaseConfig'

interface IUserAuthProviderProps {
    children: React.ReactNode;
}

type AuthContextData = {
    user: User | null,
    logIn: typeof logIn,
    signUp: typeof signUp,
    resetPassword: typeof resetPassword,
    logOut: typeof logOut
}

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
    signOut(auth);
};

const resetPassword = (email:string) => {
    return sendPasswordResetEmail(auth, email)
}

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    resetPassword,
    logOut,
});

export const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null> (null);

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log("The logged is user state is: ", user);
                setUser(user);
            }

            return() => {
                unsubscribe();
            }
        })
    })
    const value: AuthContextData = {
        user,
        logIn,
        signUp,
        resetPassword,
        logOut,
    };
    return (
        <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(userAuthContext);
}