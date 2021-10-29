function SongDisplayList({array, shorten, characters}) {

    if (!shorten) {
        return (
            <ul className="songdisplay__list">
                {array.map(link =>
                    <li key={link}><a href={link} target={"_blank"} rel={"noreferrer"}>{link}</a></li>
                )}
            </ul>
        );
    } else {
        function shortenString(string, characters) {
            if (string.length < characters) {
                return string;
            } else {
                string = string.toString().substring(0, characters - 4) + "...";
                return string;
            }
        }

        return (
            <ul className="songdisplay__list">
                {array.map(link =>
                    <li key={link}><a href={link.startsWith("http") ? link : "//" + link} target={"_blank"}
                                      rel={"noreferrer"}>{shortenString(link, characters)}</a></li>
                )}
            </ul>
        );
    }

}

export default SongDisplayList;