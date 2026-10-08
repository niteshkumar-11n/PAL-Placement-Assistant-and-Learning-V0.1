import multer from "multer";

// Vercel functions do not provide a writable project directory. Keep the
// bounded upload in memory and pass its bytes directly to the PDF parser.
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});
