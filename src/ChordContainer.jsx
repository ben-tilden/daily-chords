import './ChordContainer.css';
import useRandomChord from './chordHooks';
import Chord from '@tombatossals/react-chords/lib/Chord';

function ChordContainer(props) {

  const dateString = props.date.toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dateInMillis = props.date.setHours(0,0,0,0);
  const chordData = useRandomChord(dateInMillis);

  return (
    <div className='chord-container'>
      {chordData.status == "success" &&
        <>
          <div className='date'>{dateString}</div>
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
          />
          <div className='chord-name'>{chordData.data.key + chordData.data.suffix}</div>
        </>
      }
    </div>
  )
}

export default ChordContainer;
