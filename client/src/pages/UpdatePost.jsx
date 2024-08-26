import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Editor from "../components/Editor";

export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState(null);
    const { postId } = useParams();

    const navigate = useNavigate()
    const { currentUser } = useSelector((state) => state.user);

    const [IsLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    setIsLoading(false);
                    return;
                }
                if (res.ok) {
                    setPublishError(null);
                    console.log(data.posts[0])
                    setFormData(data.posts[0])
                    console.log(formData)
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error.message);
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null)
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            if (res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };
    return (
        <div className='p-3 ma-w-3xl mx-auto min-h-screen'>
            {IsLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1 className="text-center text-3xl my-7 font-semibold">Update Post: {formData.title}</h1>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4 sm:flex-row justify-between">
                            <TextInput type='text' placeholder='Title' required id='title'
                                className="flex-1"
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                value={formData.title}
                            />
                            <Select
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                value={formData.category}
                            >
                                <option value='uncategorized'>Select a category</option>
                                <option value='Product Review'>Product Review</option>
                                <option value='Bike Park Review'>Bike Park Review</option>
                                <option value='Skills'>Skill</option>
                            </Select>
                        </div>
                        <div className='flex gap-4 items-center justify-between p-3'>
                            <FileInput type='file' accepts='image/*' onChange={(e) => setFile(e.target.files[0])} />
                            <Button
                                type='button'
                                gradientDuoTone='purpleToBlue'
                                size='sm'
                                outline
                                onClick={handleUploadImage}
                                disabled={imageUploadProgress}
                            >
                                {
                                    imageUploadProgress ? (
                                        <div className="w-16 h16">
                                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress ||
                                                0}%`} />
                                        </div>
                                    ) : ('Updload image'
                                    )}
                            </Button>
                        </div>
                        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt='upload'
                                className='min-w-fit h-fit object-cover'
                            />
                        )}
                        <Editor
                            onChange={(value) =>
                                setFormData({ ...formData, content: value })
                            }
                            value={formData.content}
                        />
                        <Button type='submit' gradientDuoTone='purpleToPink'>
                            Update
                        </Button>
                        {
                            publishError && <Alert className="mt-5" color='failure'>{publishError}</Alert>
                        }
                    </form>
                </>
            )}
        </div>
    )
}
