import Search from "../../Molecules/Search/Search";
import SongList from "../../Molecules/SongList/SongList";
import "./AllSongsOverview.css"

function AllSongsOverview({
                              songList,
                              setSelectedSong,
                              setShowListView,
                              setShowAddScreen,
                              setBackToList,
                              setSearchValue,
                              searchValue
                          }) {

    let aFocus = searchValue != null && searchValue !== "";

    return (
        <div className={"overview"}>
            <Search id={"songlist__search"} songList={songList} setSelectedSong={setSelectedSong} hideButtons={false}
                    setShowList={setShowListView} setAddScreen={setShowAddScreen} backToList={true}
                    setBackToList={setBackToList} setSearchValue={setSearchValue} defaultValue={searchValue}
                    autoFocus={aFocus}/>
            <SongList songList={songList} setSelectedSong={setSelectedSong} setShowList={setShowListView}
                      setBackToList={setBackToList}/>
        </div>)
}

export default AllSongsOverview;