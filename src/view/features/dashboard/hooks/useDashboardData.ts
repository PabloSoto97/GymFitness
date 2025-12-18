// features/dashboard/hooks/useDashboardData.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebase";
import { ensureUser } from "../../../../services/user.service";
import { ensureDailyActivity } from "../../../../services/activity.service";

const today = new Date().toISOString().split("T")[0];

export function useDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      await ensureUser(user);
      await ensureDailyActivity(user.uid, today);

      const ref = doc(db, "activity", user.uid, "daily", today);

      const unsubSnap = onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          setData(snap.data());
        }
        setLoading(false);
      });

      return () => unsubSnap();
    });

    return () => unsubAuth();
  }, []);

  return { data, loading };
}
