import './App.css'

import useRandomChord from './chordHooks'

import Chord from '@tombatossals/react-chords/lib/Chord';

function App() {

  const chordData = useRandomChord();

  const lite = false // defaults to false if omitted

  return (
    <div className="App">
      <header className="App-header">
        {chordData &&
          <>
            <div>{chordData.key + chordData.suffix}</div>
            <Chord
                chord={
                  {
                    frets: chordData.positions,
                    fingers: chordData.fingers,
                    barres: chordData.barres,
                    capo: chordData.capo,
                    baseFret: chordData.baseFret
                  }
                }
                instrument={
                  {
                    strings: 6,
                    fretsOnChord: chordData.highestFret - chordData.baseFret < 4 ? 4 : chordData.highestFret,
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
