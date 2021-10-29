import "./SongDisplay.css"
import ShowDifficulty from "../../Atoms/ShowDifficulty/ShowDifficulty";
import {useEffect, useState} from "react";
import SongDisplayList from "../../Atoms/SongDisplayList/SongDisplayList";
import Thumbnail from "../../Atoms/Thumbnail/Thumbnail";
import LinkInput from "../../Molecules/LinkInput/LinkInput";
import {SongListService} from "../../../Services/SongListService";

function SongDisplay({songProp, setSelectedSong, setShowList, backToList}) {

    const song = songProp;
    const [videoIDs, setVideoIDs] = useState([]);
    const [loadedVideos, setLoadedVideos] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [youtubeValue, setYoutubeValue] = useState("");
    const [sheetsValue, setSheetsValue] = useState("");
    const [invalidYTLink, setInvalidYTLink] = useState(false);
    const [invalidURL, setInvalidURL] = useState(false);
    const [notes, setNotes] = useState(songProp.notes);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {width, height};
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        document.title = song.title + " - " + song.interpret;
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line
    }, []);

    function getVideoIDs() {
        song.youtube.forEach(videoURL => {
            videoURL = videoURL.replace("https://", "").replace("http://", "").replace("www.", "").replace("youtu.be/", "").replace("youtube.com/watch?v=", "")
            setVideoIDs([...videoIDs, videoURL]);
        });
    }

    /**
     * JavaScript function to match (̶a̶n̶d̶ ̶r̶e̶t̶u̶r̶n̶)̶ the video Id
     * of any valid Youtube Url, given as input string.
     * @author: Stephan Schmitz <eyecatchup@gmail.com>
     * @url: https://stackoverflow.com/a/10315969/624466
     */
    function isValidYouTubeLink(url) {
        const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url !== "") {
            setInvalidYTLink(!url.match(p))
            return !!(url.match(p));
        } else {
            setInvalidYTLink(false);
            return !!(url.match(p));
        }

    }

    function isValidURL(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        if (str !== "") {
            setInvalidURL(!pattern.test(str));
            return !!pattern.test(str);
        } else {
            setInvalidURL(false);
            return !!pattern.test(str);
        }
    }

    useEffect(() => {
        isValidYouTubeLink(youtubeValue);
    }, [youtubeValue])

    useEffect(() => {
        isValidURL(sheetsValue);
    }, [sheetsValue])

    useEffect(() => {
        if (videoIDs.length <= 0) {
            setLoadedVideos(false);
        } else {
            setLoadedVideos(true);
        }
    }, [videoIDs])

    useEffect(() => {
        getVideoIDs();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        SongListService.changeFieldValue(song, "notes", notes);
        // eslint-disable-next-line
    }, [notes])

    function validYTAdd() {
        SongListService.addLink(song, youtubeValue, "yt");
    }

    function invalidAdd() {
        console.log("invalid add");
    }

    function validURLAdd() {
        SongListService.addLink(song, sheetsValue, "url");
    }

    // eslint-disable-next-line
    const {height, width} = windowDimensions;
    let characters = 50;
    if (width < 1000) {
        characters = 32;
    }
    return <div className="songdisplay">
        <div className={"songdisplay__top"}>
            <div className="songdisplay__header">
                <h1 id={"button"} onClick={() => {
                    if (backToList) {
                        setSelectedSong(null);
                        setShowList(true);
                    } else {
                        setSelectedSong(null);
                        setShowList(false)
                    }

                }
                }>←</h1>
                <div className={"songdisplay__header__infos"}>
                    <h1>{song.title} - </h1>
                    <h1>{song.interpret}</h1>
                </div>
                {/*TODO: Icons?*/}
                <div className={"songdisplay__header__icons"}>
                    <p onClick={event => {
                        event.preventDefault();
                        setEditMode(!editMode)
                    }
                    }>✏</p>
                    <p onClick={event => {
                        event.preventDefault();
                        setShowList(false);
                        SongListService.deleteSong(song);
                        setSelectedSong(null);

                    }
                    } id={"icon__trash"}>🗑</p>
                </div>
            </div>
            <div className={"songdisplay__youtube"}>
                <div className={"songdisplay__youtube__left"}>
                    {loadedVideos ?
                        <Thumbnail song={song} isLink={true}/> :
                        <img alt={""} src={"https://via.placeholder.com/1920x1080?text=Kein Vorschaubild verfügbar!"}/>}
                </div>
                <div className={"songdisplay__youtube__right"}>
                    <h2>Weitere Videos:</h2>
                    <SongDisplayList array={songProp.youtube} shorten={false}/>
                    <LinkInput editMode={editMode} className={"add__youtube"} setValueInput={setYoutubeValue}
                               valueInput={youtubeValue} validFunction={validYTAdd}
                               validCheckerFunction={isValidYouTubeLink} invalidFunction={invalidAdd}
                               invalidLink={invalidYTLink} elementID={"add__youtube__input"}/>

                </div>
            </div>
        </div>

        <div className={"songdisplay__bottom"}>
            <div className={"songdisplay__infos"}>
                <div className={"songdisplay__infos__left"}>
                    <div className={"songdisplay__sheets"}>
                        <h2>Noten:</h2>
                        <SongDisplayList shorten={true} characters={characters} array={songProp.sheetMusic}/>
                        <LinkInput editMode={editMode} className={"add__sheets"} setValueInput={setSheetsValue}
                                   valueInput={sheetsValue} validFunction={validURLAdd}
                                   validCheckerFunction={isValidURL}
                                   invalidFunction={invalidAdd} invalidLink={invalidURL}
                                   elementID={"add__sheets__input"}/>
                    </div>
                    <div className={"songdisplay__difficulty"}>
                        <h2 id={editMode ? "edit" : "difficulty"}><ShowDifficulty editMode={editMode} song={song}
                                                                                  difficulty={songProp.difficulty}/>
                        </h2>
                    </div>
                </div>
                <div className={"songdisplay__infos__right"}>
                    <div className={"songdisplay__notes"}>
                        <h2>Notizen:</h2>
                        <textarea name={"notes"} defaultValue={songProp.notes} onChange={event => {
                            event.preventDefault();
                            if (event.target.value !== notes || notes !== null) {
                                setNotes(event.target.value);
                            }
                        }
                        }/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SongDisplay;