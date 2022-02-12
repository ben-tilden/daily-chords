import './App.css';
import db from './firebaseDb';
import { getDailyChord, getRandomChordFromId } from './helpers'

import { useEffect, useReducer } from 'react';
import { collection, updateDoc, doc, Timestamp } from 'firebase/firestore';

// Reducer for hook state and actions
const reducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return { status: action.type, data: action.payload, error: undefined };
        case 'error':
            return { status: action.type, data: undefined, error: action.payload };
        default:
            throw new Error('Invalid Action');
    }
};

export default function useRandomChord() {
    const initialState = {
        status: 'loading',
        data: undefined,
        error: undefined,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const runFirestoreStateLogic = async () => {
            const allChordsRef = collection(db, 'allChords');
            const currentDate = new Date();
            currentDate.setHours(0,0,0,0);
            const randomId = doc(allChordsRef).id;

            try {
                const dailyChordDoc = await getDailyChord(currentDate, allChordsRef);
                if (dailyChordDoc) {
                    dispatch({ type: 'success', payload: dailyChordDoc.data() });
                } else {
                    const randomChordDoc = await getRandomChordFromId(randomId, allChordsRef);
                    if (!randomChordDoc) {
                        throw 'No chord found';
                    }
                    await updateDoc(randomChordDoc.ref, {
                        randomId: randomId,
                        dates: [...randomChordDoc.data().dates, Timestamp.fromDate(currentDate)],
                    });
                    dispatch({ type: 'success', payload: randomChordDoc.data() });
                }
            } catch (error) {
                dispatch({ type: 'error', payload: error });
            }
        }

        runFirestoreStateLogic();
    }, [])

    return state;
}
