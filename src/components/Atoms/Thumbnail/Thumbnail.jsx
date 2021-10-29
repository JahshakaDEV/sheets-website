function Thumbnail({song, isLink}) {
    let id;
    if (song.youtube.length > 0) {
        let videoURL = song.youtube[0].toString();
        videoURL = videoURL.replace("https://", "").replace("http://", "").replace("www.", "").replace("youtu.be/", "")
            .replace("youtube.com/watch?v=", "");
        id = videoURL;
    } else {
        id = "noThumbnail"
    }

    if (id === "noThumbnail") {
        return <img src={"https://via.placeholder.com/1920x1080?text=Kein Vorschaubild verfügbar!"} alt={""}/>
    } else {
        if (isLink) {
            return (
                <a href={
                    "https://youtu.be/" + id} target={"_blank"} rel={"noreferrer"}>
                    <img alt="" src={"https://img.youtube.com/vi/" + id + "/maxresdefault.jpg"}/>
                </a>
            )
        } else {
            return (
                <img alt="" src={"https://img.youtube.com/vi/" + id + "/maxresdefault.jpg"}/>
            )
        }

    }
}

export default Thumbnail;