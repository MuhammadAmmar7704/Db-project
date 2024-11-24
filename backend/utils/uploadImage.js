import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dkjfmi5rz',
  api_key: '144496546383315',
  api_secret: 'AGTRewNvxosEQ3YT1Sb0FRIa9js',
});

// Set up multer to handle image uploads (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Image upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Check if file exists in the request
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    cloudinary.v2.uploader.upload_stream(
      { folder: 'societyManagement' },
      (error, result) => {
        if (error) {
          return res.status(500).json({ success: false, error: error.message });
        }
        
        res.json({ success: true, url: result.secure_url });
      }
    ).end(req.file.buffer); 
  } catch (error) {
    console.error('Image upload failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
