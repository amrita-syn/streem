const fs = require('fs');
const archiver = require('archiver');

const ZipStreamer = async (
  outStream = fs.createWriteStream(__dirname + '/target.zip')) => {
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });


  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err;
  });

  // pipe archive data to the outstream
  if (!Array.isArray(outStream)) {
    outStream = [outStream];
  }

  outStream.forEach(stream => {
    archive.pipe(stream);
  });

  return archive;
}

exports.ZipStreamer = ZipStreamer;