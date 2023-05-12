const path_image = process.env.NODE_ENV === "production"
const localBaseUrl = process.env.IMAGE_URL_LOCAL || ''
const prodBaseUrl = process.env.IMAGE_URL_PROD || ''

const fs = require("fs");

const remove = (data) => {
  let error = null
  const rawData = JSON.stringify(data)
  let { image } = JSON.parse(rawData);
  console.log("path ->", image);
  const path = image.split('uploads')
  const directoryPath = 'uploads' + path[path.length - 1]
  try {
    fs.unlink(directoryPath, (err) => {
      error = err
    });
    if (error) {
      console.log('Could not delete the file. ');
      return false
    }
    console.log(`File : ${directoryPath} is deleted.`);
    return true
  } catch (error) {
    return error
  }
};

module.exports = {
  baseImageUrl: `${path_image ? `${prodBaseUrl}/` : `${localBaseUrl}/`}`,
  // baseImageUrl: ``,
  removeImage: remove
}