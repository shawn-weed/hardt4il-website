import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imagefileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef()
    const handleImageChange = (e) => {
      setImageFile(e.target.files[0]);
      const file = e.target.files[0]
      if (file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    };
    useEffect(() => {
      if (imageFile) {
        uploadImage();
      }
    }, [imageFile]);

      const uploadImage = async () => {
        setImageFileUploadError(null)
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = 
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageFileUploadError(
              'Could not upload image (Ensure file is less than 2MB)'
            );
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL);
            });
          }
        );
      };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form className ='flex flex-col gap-5'>
            <input hidden type='file' accept='/image/*' onChange={handleImageChange} ref={filePickerRef}/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() =>
              filePickerRef.current.click()}
            >
              {imageFileUploadProgress && (
                <CircularProgressbar 
                  value = {imageFileUploadProgress || 0} 
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                    text: {
                      fill: '#FF00FF'
                    },
                    path: {
                      stroke: `rgba(255, 0 , 255, ${
                        imageFileUploadProgress / 100}
                        )`,
                    },
                  }} 
                />
              )}
              <img src={imageFileUrl || currentUser.profilePicture} alt='Profile photo'
              className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
            </div>
              {imagefileUploadError && <Alert color='failure'>{imagefileUploadError}</Alert>}
            <TextInput 
              type='text' 
              id='username' 
              placeholder='username'
              defaultValue={currentUser.username} 
            />
            <TextInput 
              type='email' 
              id='email' 
              placeholder='email'
              defaultValue={currentUser.email} 
            />
            <TextInput 
              type='password' 
              id='password' 
              placeholder='password'
            />
            <Button gradientDuoTone='purpleToPink' type='submit' outline>
              Update
            </Button>
        </form>
        <div className="text-red-500 dark:text-white flex justify-between mt-5">
            <span className="cursor-pointer">Delete Account</span>
            <span className="cursor-pointer">Sign Out</span>
        </div>
    </div>
  )
}
