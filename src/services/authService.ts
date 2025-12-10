// src/services/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdToken,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { auth } from "../firebase/firebase"; // ajustar path si usás otro nombre

// (si querés eliminar email register/login, podés dejar las funciones pero no usarlas)
export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const getFirebaseIdToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await getIdToken(user, true);
};

export const onAuthChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

/** --- GOOGLE SIGN IN --- */
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async () => {
  // abrir popup y logear con Google
  const result = await signInWithPopup(auth, googleProvider);
  // result.user contiene la info del usuario
  return result;
};
