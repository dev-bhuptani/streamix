// const path = require("path");
const fs = require("fs");

exports.getEnter = (req, res, next) => {
  const entType = req.query.entType;
  const entId = req.query.entId;

  let path = "public/";
  let ent,
    mp = "mp";
  if (entType === "movies") {
    ent = "video";
    mp = "mp4";
    path += "movies/" + entId + "." + mp;
  } else if (entType === "series") {
    ent = "video";
    mp = "mp4";
    path += "series/" + entId + "." + mp;
  } else {
    ent = "audio";
    mp = "mp3";
    path += "songs/" + entId + "." + mp;
  }
  console.log("HERE!!!");
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": ent + "/" + mp,
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": ent + "/" + mp,
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
};
