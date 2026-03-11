import { Injectable } from '@nestjs/common';
import { v2 as clodudinary } from 'cloudinary';
import { CloudinaryResponse } from './upload-image.response';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const streamifier = require('streamifier');
// Uploads an image to Cloudinary using a memory buffer.
// Multer provides the file buffer, streamifier converts it to a stream,
// and the stream is piped to Cloudinary's upload_stream.
@Injectable()
export class UploadImageService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = clodudinary.uploader.upload_stream(
        (error, result) => {
          if (error)
            return reject(
              new Error(`Error uploading file to Cloudinary: ${error.message}`),
            );
          if (!result)
            return reject(new Error('No result returned from Cloudinary'));
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
