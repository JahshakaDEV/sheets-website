import './App.css';
import Overview from "./components/Organism/Overview/Overview";

function App({songList}) {
    return (
        <div className="App">
            <Overview songListProp={songList}/>
        </div>
    )
}

export default App;



