import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
})

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  folder: process.env.FOLDER_NAME || 'default'
}

/**
 * Upload image to Cloudinary
 * @param imageBase64 - base64 encoded image (with mime type)
 * @param fileName - public ID for the file in Cloudinary
 * @returns secure URL string
 */
export const uploadCloudinary = async (imageBase64: string, fileName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageBase64, { ...options, public_id: fileName.trim() }, (error, result) => {
      if (result) {
        return resolve(result.secure_url)
      }
      reject(error)
    })
  })
}

/**
 * Remove image from Cloudinary
 * @param imageUrl - full image URL to delete
 * @returns cloudinary deletion result
 */
export const removeCloudinary = async (imageUrl: string): Promise<UploadApiResponse | undefined> => {
  const publicId = imageUrl.split('/').pop()?.split('.')[0]
  if (!publicId) throw new Error('Invalid image URL')

  const fullPublicId = `${options.folder}/${publicId}`
  const result = await cloudinary.uploader.destroy(fullPublicId)
  return result
}
