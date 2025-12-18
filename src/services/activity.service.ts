import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function ensureDailyActivity(uid: string, date: string) {
  const ref = doc(db, "activity", uid, "daily", date);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      calories: 0,
      steps: 0,
      activeMinutes: 0,
      workouts: 0,
      updatedAt: serverTimestamp(),
    });
  }
}
