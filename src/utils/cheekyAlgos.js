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
        all.push(artist.name);
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