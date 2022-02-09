import './App.css'

import useRandomChord from './chordHooks'

import Chord from '@tombatossals/react-chords/lib/Chord';

function App() {

  const chordData = useRandomChord();

  console.log(chordData);

  const lite = false // defaults to false if omitted

  return (
    <div className="App">
      <header className="App-header">
        {chordData.status == "success" &&
          <>
            <div>{chordData.data.key + chordData.data.suffix}</div>
            <Chord
                chord={
                  {
                    frets: chordData.data.positions,
                    fingers: chordData.data.fingers,
                    barres: chordData.data.barres,
                    capo: chordData.data.capo,
                    baseFret: chordData.data.baseFret
                  }
                }
                instrument={
                  {
                    strings: 6,
                    fretsOnChord: chordData.data.highestFret - chordData.data.baseFret < 4 ? 4 : chordData.data.highestFret,
                    name: 'Guitar',
                    keys: [],
                    tunings: {
                        standard: ['E', 'A', 'D', 'G', 'B', 'E']
                    }
                  }
                }
                lite={lite}
            />
          </>
        }
      </header>
    </div>
  )
}

export default App
