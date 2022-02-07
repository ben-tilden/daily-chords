import './App.css'
import db from './firebaseDb'

import { useRef, useEffect } from 'react';
import { collection, query, where, limit, doc, documentId, getDocs } from "firebase/firestore";

export default function useRandomChord() {

    const chordsRef = collection(db, 'allChords');
    const key = useRef(doc(chordsRef).id);
    const queryComparator = Math.random() < 0.5 ? '>=' : '<=';
    const q = query(chordsRef, where(documentId(), queryComparator, key.current), limit(1));

    const state = useFirestoreQueryOnce(q);

    return state;

    // TODO ensure that query does, in fact, provide a value
    // TODO update document ID's in db once picked to reinforce randomness
    // TODO fix chord rendering issues with higher frets and greater number of frets (fork react-chords)

}

// Reducer for hook state and actions
const reducer = (state, action) => {
    switch (action.type) {
        case "idle":
            return { status: "idle", data: undefined, error: undefined };
        case "loading":
            return { status: "loading", data: undefined, error: undefined };
        case "success":
            return { status: "success", data: action.payload, error: undefined };
        case "error":
            return { status: "error", data: undefined, error: action.payload };
        default:
            throw new Error("invalid action");
    }
};

// implementing this getDocs hooks rather than an onSnapshot one since there's
// no expectation in our use case for this db data to be updated and thus no
// need for listeners to be set
export function useFirestoreQueryOnce(query) {

    const initialState = {
        status: query ? "loading" : "idle",
        data: undefined,
        error: undefined,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        if (!query) {
            dispatch({ type: "idle" });
            return;
        }

        dispatch({ type: "loading" });

        const retrieveChord = async () => {
            try {
                const querySnapshot = await getDocs(query);
                const data = querySnapshot.docs.map((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    return doc.data();
                });
                dispatch({ type: success, payload: data })
            } catch (error) {
                dispatch({ type: error, payload: error })
            }
        }
        retrieveChord();
    }, [query])

    return state; // TODO investigate what this return value is if nothing found

}
