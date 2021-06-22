import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

export const getArtistNames = (arr) => {
  const ret = [];
  arr.forEach((artist) => {
    ret.push(artist.name);
  });
  return ret;
}; 

export const getTopArtists = (arr) => {
    const all = [];
    let hash = {};
    arr.forEach((song) => {
      song.artists.forEach((artist) => {
        all.push(artist);
      });
    });
    all.forEach((artist) => {
      if (hash[artist] === undefined) {
        hash[artist] = 1;
      } else {
        hash[artist] = hash[artist] + 1;
      }
    });
    const ret = [0, 0, 0];
    Object.keys(hash).forEach((key) => {
      let counter = 0;
      ret.forEach((num, index) => {
        if (typeof num === "number") {
          if (counter === 0 && hash[key] > num) {
            ret[index] = key;
            counter++;
          }
        } else {
          if (counter === 0 && hash[key] > hash[num]) {
            const current = ret[index];
            ret[index] = key;
            ret[index + 1] = current;
            counter++;
          }
        }
      });
    });
    return ret;
  };

  export const getPlaylistCover = (playlist) => {
    if (playlist.images.length > 0) {
      return (
        <img
          src={playlist.images[0].url}
          alt={playlist.title}
          style={{
            width: "6rem",
            height: "6rem",
          }}
        />
      );
    } else if (playlist.songs.length < 1) {
      return (
        <img
          src={
            "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2"
          }
          alt={playlist.title}
          style={{
            width: "6rem",
            height: "6rem",
          }}
        />
      );
    } else if (playlist.songs.length < 4) {
      return (
        <img
          src={playlist.songs[0].images[0].url}
          alt={playlist.title}
          style={{
            width: "6rem",
            height: "6rem",
          }}
        />
      );
    } else {
      return (
        <GridList
          cols={2}
          spacing={0}
          cellHeight={96}
          style={{
            width: "12rem",
            height: "12rem",
          }}
        >
          {playlist.songs.map((song, index) => {
            if (index < 4) {
              return (
                <GridListTile key={index}>
                  <img
                    src={song.images[0].url}
                    alt={playlist.title}
                    style={{
                      width: "6rem",
                      height: "6rem",
                    }}
                  />
                </GridListTile>
              );
            } else {
              return null;
            }
          })}
        </GridList>
      );
    }
  };