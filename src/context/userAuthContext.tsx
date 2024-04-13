import {
    AuthCredential, UserCredential, User, createUserWithEmailAndPassword, onAuthStateChanged,
    reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword,
     verifyBeforeUpdateEmail, updateProfile
} from 'firebase/auth'
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
    logOut: typeof logOut,
    changePassword: typeof changePassword,
    changeEmail: typeof changeEmail,
    reauthenticate: typeof reauthenticate
    updateUserProfilePhoto: typeof updateUserProfilePhoto
}


const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
    signOut(auth);
    console.log("User out: ", auth.currentUser?.uid)
};

const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
}

const changeEmail = async (currentEmail: string, newEmail: string, password: string): Promise<void> => {
    try {
        if (auth.currentUser) {
            const currentUser: User = await signInWithEmailAndPassword(auth, currentEmail, password)
                .then((userCredential: UserCredential) => userCredential.user);

            await verifyBeforeUpdateEmail(currentUser as User, newEmail).then(() => {
                console.log("Email updated successfully to: ", newEmail)
            }).catch((error) => {
                console.error(error);
            });
        }
    }
    catch (error) {
        console.log("Change email discard: ", error)
    }
}

const changePassword = async (currentPassword: string, newPassword: string, email: string): Promise<void> => {
    try {
        if (auth.currentUser) {
            const currentUser: User = await signInWithEmailAndPassword(auth, email, currentPassword)
                .then((userCredential: UserCredential) => userCredential.user);

            await updatePassword(currentUser, newPassword);
        }
    }
    catch (error: any) {
        console.log("Change password discard: ", error)
    }
}

const reauthenticate = async (credential: AuthCredential) => {
    try {
        const user = auth.currentUser;
        if (user) {
            await reauthenticateWithCredential(user, credential)
        }
    }
    catch (error) {
        console.log("user null: ", error)
    }
}

const updateUserProfilePhoto = async (photoUrl: string) => {
    const user = auth.currentUser;
    if (user) {
        try {
            await updateProfile(user, { photoURL: photoUrl });
            console.log("Profile photo updated!");
        } catch (error) {
            console.error("Updation failed: ", error);
        }
    } else {
        console.log("User isn`t auth");
    }
}

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    resetPassword,
    logOut,
    changeEmail,
    changePassword,
    reauthenticate,
    updateUserProfilePhoto
});

export const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("The logged is user state is: ", user);
                setUser(user);
            }

            return () => {
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
        changeEmail,
        changePassword,
        reauthenticate,
        updateUserProfilePhoto
    };
    return (
        <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(userAuthContext);
}