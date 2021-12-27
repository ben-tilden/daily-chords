import { getFirestore } from "firebase/firestore"
import app from "./firebaseApp"

export default getFirestore(app);
