import './App.css'
import db from './firebaseDb'

import { useRef, useEffect, useReducer } from 'react';
import { collection, query, where, limit, doc, documentId, getDocs } from 'firebase/firestore';

// Reducer for hook state and actions
const reducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return { status: 'loading', data: undefined, error: undefined };
        case 'success':
            return { status: 'success', data: action.payload, error: undefined };
        case 'error':
            return { status: 'error', data: undefined, error: action.payload };
        default:
            throw new Error('invalid action');
    }
};

export default function useRandomChord() {
    const initialState = {
        status: 'loading',
        data: undefined,
        error: undefined,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const allChords = collection(db, 'allChords');

    const key = useRef(doc(allChords).id);

    const [queryComparator, queryComparatorBackup] = Math.random() < 0.5 ? ['>=','<='] : ['<=','>='];
    const comparatorRef = useRef(queryComparator);
    const comparatorBackupRef = useRef(queryComparatorBackup);

    const initialQuery = query(allChords, where(documentId(), comparatorRef.current, key.current), limit(1));
    const backupQuery = query(allChords, where(documentId(), comparatorBackupRef.current, key.current), limit(1));

    useEffect(() => {
        const retrieveChord = async () => {
            try {
                let snapshot = await getDocs(initialQuery);
                if (snapshot.empty) {
                    snapshot = await getDocs(backupQuery);
                }
                const data = snapshot.docs.map((doc) => doc.data());
                dispatch({ type: 'success', payload: data[0] });
            } catch (error) {
                dispatch({ type: 'error', payload: error });
            }
        }
        retrieveChord();
    }, [])

    return state;

    // TODO update document ID's in db once picked to reinforce randomness
    // TODO push document data to the history db


}
