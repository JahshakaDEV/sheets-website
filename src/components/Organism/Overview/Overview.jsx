import {useEffect, useState} from "react";
import SongDisplay from "../SongDisplay/SongDisplay";
import LandingPage from "../LandingPage/LandingPage";
import AddSongScreen from "../AddSongScreen/AddSongScreen";
import {SongListService} from "../../../Services/SongListService";
import AllSongsOverview from "../AllSongsOverview/AllSongsOverview";
import {filter} from 'lodash';

function Overview({songListProp}) {

    const [searchValue, setSearchValue] = useState("");
    const [songListSearch, setSongListSearch] = useState(SongListService.getIntialList());
    const [selectedSong, setSelectedSong] = useState(null);
    const [showListView, setShowListView] = useState(false);
    const [showAddScreen, setShowAddScreen] = useState(false);
    const [backToList, setBackToList] = useState(false);
    const [songList, setSongList] = useState(songListProp);

    const updateSongList = (songList) => {
        setSongList(songList);
        SongListService.updateSongList(songList);
    }

    const addSong = (song) => {
        updateSongList([...songList, song])
    }

    useEffect(() => {
        if (showListView === false) {
            if (searchValue !== "" || searchValue == null) {
                setShowListView(true);
                setSelectedSong(null);
            }
        }
        const localSearchValue = searchValue.toLowerCase()
        let filteredSongList;
        if (localSearchValue !== "") {
            filteredSongList = filter(songListProp, (song => {
                return song.title.toLowerCase().match(localSearchValue) || song.interpret.toLowerCase().match(localSearchValue);
            }));
        } else {
            filteredSongList = songListProp;
            setSongListSearch(songListProp);
        }
        setSongListSearch(filteredSongList);
    }, [searchValue])

    useEffect(() => {
        if (selectedSong != null) {
            setSearchValue("");
            setSongListSearch(songListProp);
        }
    }, [selectedSong])

    if (showListView || showAddScreen) {
        return showListView ? (<AllSongsOverview setShowAddScreen={setShowAddScreen} setShowListView={setShowListView}
                                                 setBackToList={setBackToList} songList={songListSearch}
                                                 setSelectedSong={setSelectedSong} setSearchValue={setSearchValue}
                                                 searchValue={searchValue}/>) :
            <AddSongScreen addSongHandler={addSong} setListView={setShowListView} setAddSong={setShowAddScreen}/>
    } else {
        if (selectedSong) {
            return <SongDisplay songProp={selectedSong} setSelectedSong={setSelectedSong} setShowList={setShowListView}
                                backToList={backToList}/>
        } else {
            return <LandingPage setSelectedSong={setSelectedSong} setShowList={setShowListView}
                                setBackToList={setBackToList} setSearchValue={setSearchValue}/>
        }
    }
}

export default Overview;