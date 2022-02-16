import './App.css';
import ChordContainer from './ChordContainer'

function App() {
  const currentDate = new Date();

  return (
    <div className="App">
      <header className="App-header">daily chords</header>
      <ChordContainer date={currentDate}></ChordContainer>
    </div>
  )
}

export default App;
