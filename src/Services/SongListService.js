function checkIfSongInList(song, songList) {
    let index = -1;
    index = songList.indexOf(song);
    if (index !== -1) {
        return index;
    } else {
        // eslint-disable-next-line
        songList.map(songs => {
            if (songs.title === song.title && songs.interpret === song.interpret) {
                index = songList.indexOf(songs);
            }
        })
        if (index !== -1) {
            return index;
        }
    }
    return false;
}

export const SongListService = {
    getIntialList: () => {
        if (JSON.parse(window.localStorage.getItem('songList')) !== null) {
            return JSON.parse(window.localStorage.getItem('songList'))
        } else {
            window.localStorage.setItem('songList', "[{\"title\":\"Megalovania\",\"interpret\":\"Toby Fox\",\"difficulty\":3,\"youtube\":[\"https://www.youtube.com/watch?v=SWKR0BzL_z0\",\"https://www.youtube.com/watch?v=xzwTirMaAkY\"],\"sheetMusic\":[\"https://drive.google.com/file/d/1k0RR5NuzhwTikiprz30okoAMR9wcPfHy/view\"],\"notes\":\"\"}]")
            return JSON.parse(window.localStorage.getItem('songList'));
        }
    },

    updateSongList: (songList) => {
        window.localStorage.setItem('songList', JSON.stringify(songList));
    },


    deleteSong: (song) => {
        let songList = SongListService.getIntialList();
        let index = checkIfSongInList(song, songList);
        if (index !== false) {
            songList.splice(index, 1);
            SongListService.updateSongList(songList);
        }
    },

    getRandomSongs: (count) => {
        let randomSongs = [];
        const allSongs = JSON.parse(window.localStorage.getItem('songList'));
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * allSongs.length);
            const randomSong = allSongs[randomIndex];
            randomSongs = [...randomSongs, randomSong]
            allSongs.splice(randomIndex, 1);
        }
        return randomSongs;
    },

    changeFieldValue: (song, fieldToEdit, value) => {
        if (fieldToEdit === "title" || "interpret" || "difficulty" || "notes") {
            let songList = SongListService.getIntialList();
            let index = checkIfSongInList(song, songList);
            if (index !== false) {
                songList.splice(index, 1);
                switch (fieldToEdit) {
                    case "title":
                        song.title = value;
                        songList = [...songList, song];
                        SongListService.updateSongList(songList);
                        break;

                    case "interpret":
                        song.interpret = value;
                        songList = [...songList, song];
                        SongListService.updateSongList(songList);
                        break;

                    case "difficulty":
                        song.difficulty = parseInt(value);
                        songList = [...songList, song];
                        SongListService.updateSongList(songList);
                        break;

                    case "notes":
                        song.notes = value;
                        songList = [...songList, song];
                        SongListService.updateSongList(songList);
                        break;

                    default:
                        break;
                }
            }
        }
    },

    addLink: (song, link, type) => {
        let songList = SongListService.getIntialList();
        let index = checkIfSongInList(song, songList);
        songList.splice(index, 1);
        if (index !== false) {
            if (type === "yt") {
                song.youtube = [...song.youtube, link]
                songList = [...songList, song]
                SongListService.updateSongList(songList);

            } else {
                song.sheetMusic = [...song.sheetMusic, link]
                songList = [...songList, song]
                SongListService.updateSongList(songList);

            }
        }
    },

    songListSizeLandingPageCheck: () => {
        if (SongListService.getIntialList().length >= 6) {
            return 6;
        } else {
            return SongListService.getIntialList().length;
        }
    }

}
