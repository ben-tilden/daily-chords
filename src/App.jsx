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
            <div>{chordData[0].key + chordData[0].suffix}</div>
            <Chord
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
                    fretsOnChord: chordData[0].highestFret - chordData[0].baseFret < 4 ? 4 : chordData[0].highestFret,
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
