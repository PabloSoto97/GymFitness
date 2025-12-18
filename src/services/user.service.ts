import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { User } from "firebase/auth";

export async function ensureUser(user: User) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      name: user.displayName || "Atleta",
      email: user.email,
      photoURL: user.photoURL,
      role: "USER",
      createdAt: serverTimestamp(),
    });
  }
}
