import multer from 'multer'

const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  limits: {
    fieldSize: 100 * 1024 * 1024, // 100MB cho mỗi content upload
    fileSize: 30 * 1024 * 1024 // 30MB cho mỗi file upload
  }
})
