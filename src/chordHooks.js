import './App.css'
import db from './firebaseDb'

import { useRef } from 'react';
import { collection, query, where, limit, doc, documentId } from "firebase/firestore";

import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

export default function useRandomChord() {

    const chordsRef = collection(db, 'allChords');
    const key = useRef(doc(chordsRef).id);
    // console.log(key);

    // TODO ensure that query does, in fact, a value
    // TODO switch conditional randomly between '>=' and '<='
    // TODO update document ID's in db once picked to reinforce randomness
    // TODO fix chord rendering issues with higher frets and greater number of frets (fork react-chords)

    const q = query(chordsRef, where(documentId(), '>=', key.current), limit(1));
    const [chordData] = useCollectionDataOnce(q);
    console.log(chordData)

    return chordData;

}
