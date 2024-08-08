import React from 'react'
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploader from 'quill-image-uploader';
import { useMemo } from 'react';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

Quill.register('modules/imageUploader', ImageUploader);

export default function Editor( { onChange, value=null }) {
    const modules = useMemo( () => ({
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                {'list': 'ordered'}, 
                {'list': 'bullet'}, 
                {'indent': '-1'}, 
                {'indent': '+1'}
            ],
            ['link', 'image'],
            ['clean'],
        ], imageUploader: {
            upload: file => {
                return new Promise((resolve, reject) => {
                    const uploaderFormData = new FormData();
                    uploaderFormData.append('image', file);
    
                    const uploaderStorage = getStorage(app);
                    const uploaderFileName = new Date().getTime() + '-' + file.name
                    const uploaderStorageRef = ref(uploaderStorage, uploaderFileName);
                    const uploaderUploadTask = uploadBytesResumable(uploaderStorageRef, file);
                    uploaderUploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = 
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        },
                    (error) => {
                      reject('Upload failed')
                    },
                    () => {
                        getDownloadURL(uploaderUploadTask.snapshot.ref).then((uploaderDownloadURL) => {
                            resolve(uploaderDownloadURL)
                        });
                      }
                  );
                })
            }
        }
      }), []);
  return (
    <ReactQuill
                theme="snow" 
                placeholder='Write something...' 
                className="h-72 mb-12" 
                required
                value={value}
                modules={modules}
                onChange={onChange}
            />
  )
}
