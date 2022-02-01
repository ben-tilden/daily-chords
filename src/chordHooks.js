import './App.css'
import db from './firebaseDb'

import { useRef, useState, useEffect } from 'react';
import { collection, query, where, limit, doc, documentId, getDocs } from "firebase/firestore";

// import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

export default function useRandomChord() {
    // usage if issue #77 in react firebase hooks were resolved:
    // const q = query(chordsRef, where(documentId(), '>=', key.current), limit(1));
    // const [chordData] = useCollectionDataOnce(q);
    // return chordData[0];

    const chordsRef = collection(db, 'allChords');
    const key = useRef(doc(chordsRef).id);
    const q = query(chordsRef, where(documentId(), '>=', key.current), limit(1));

    const [chordData] = useFirestoreQuery(q);

    return chordData;

    // TODO ensure that query does, in fact, provide a value (useReducer?)
    // TODO switch conditional randomly between '>=' and '<=' (useReducer?)
    // TODO update document ID's in db once picked to reinforce randomness
    // TODO fix chord rendering issues with higher frets and greater number of frets (fork react-chords)

}

export function useFirestoreQuery(query) {

    const [chordData, setChordData] = useState([]);

    useEffect(() => {
        const retrieveChord = async () => {
            const querySnapshot = await getDocs(query);
            const data = querySnapshot.docs.map((doc) => {
                console.log(doc.id, " => ", doc.data());
                return doc.data();
            });
            setChordData(data);
        }
        retrieveChord();
    }, [])

    return chordData; // TODO investigate what this return value is if nothing found

}
