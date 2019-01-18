const regImage  = /^image\//
const regVideo = /^video\//

export const isImageFile = function (file) {
  return regImage.test(file.type)
}

export const isVideoFile = function (file) {
  return regVideo.test(file.type)
}
