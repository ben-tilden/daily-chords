import './App.css'
import db from './firebaseDb'

import { collection, query, where, limit, getDocs } from "firebase/firestore";
import Chord from '@tombatossals/react-chords/lib/Chord';

import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

function App() {

  const chordsRef = collection(db, "allChords");
  const q = query(chordsRef, where("key", "==", "G"), limit(1));

  const [chordData] = useCollectionDataOnce(q);

  console.log(chordData);

  const lite = false // defaults to false if omitted

  return (
    <div className="App">
      <header className="App-header">
        {chordData && <Chord
            chord={
              {
                frets: chordData[0].positions,
                fingers: chordData[0].fingers,
                barres: chordData[0].barres,
                capo: chordData[0].capo,
                baseFret: chordData[0].baseFret
              }
            }
            instrument={
              {
                strings: 6,
                fretsOnChord: chordData[0].highestFret - chordData[0].baseFret + 1,
                name: 'Guitar',
                keys: [],
                tunings: {
                    standard: ['E', 'A', 'D', 'G', 'B', 'E']
                }
              }
            }
            lite={lite}
        />}
      </header>
    </div>
  )
}

export default App
