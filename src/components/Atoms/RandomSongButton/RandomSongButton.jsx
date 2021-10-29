import "./RandomSongButton.css";

function RandomSongButton({songList, setSelectedSong, setListView, setBackToList, backToList, setSearchValue}) {
    return (
        <p className="random__song__button" onClick={() => {
            let random = songList[Math.floor(Math.random() * songList.length)];
            setSelectedSong(random);
            setListView(false);
            setBackToList(backToList);
            setSearchValue("");
        }}>⟳</p>
    )
}

export default RandomSongButton;