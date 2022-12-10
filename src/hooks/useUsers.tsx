import {
  collection,
  query,
  Timestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../App";

export async function getUsers() {
  const tsToMillis = Timestamp.now().toMillis();
  // const date48hAgo = tsToMillis - 10 * 1000;
  const date48hAgo = tsToMillis - 48 * 60 * 60 * 1000;
  const startOfDay = new Date(date48hAgo);
  startOfDay.setUTCHours(0, 0, 0, 0);
  console.log("date", date48hAgo, startOfDay);
  const usersRef = collection(firestore, "users");

  const usersQuery = query(
    usersRef,
    where("banned", "==", true),
    where("banDate", "<=", startOfDay)
  );
  try {
    const docs = await getDocs(usersQuery);
    console.log("docs", docs);
    docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    // const [users, loading, error] = useCollectionData(usersQuery);
    // console.log("loading", loading);
    // console.log("error", error);
    // console.log("users", users);

    return [docs];
  } catch (err) {
    const error = err as any;
    console.log("error", error.message);
  }
}
