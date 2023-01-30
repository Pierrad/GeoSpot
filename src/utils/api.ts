import APP from '../config/app'

export const getImageUrl = (image: string) => {
  return APP.API_URL_STORAGE + '/' + image.replace('public/', '')
}
