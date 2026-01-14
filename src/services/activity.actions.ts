import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function addSteps(uid: string, date: string, value: number) {
  const ref = doc(db, "activity", uid, "daily", date);
  await updateDoc(ref, {
    steps: increment(value),
    updatedAt: serverTimestamp(),
  });
}

export async function addWorkout(uid: string, date: string) {
  const ref = doc(db, "activity", uid, "daily", date);
  await updateDoc(ref, {
    workouts: increment(1),
    activeMinutes: increment(60),
    calories: increment(400),
    updatedAt: serverTimestamp(),
  });
}
