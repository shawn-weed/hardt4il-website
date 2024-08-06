import YouTube from 'react-youtube';
import { useEffect, useState, useRef } from 'react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

export default function YoutubeSearch({ playlist }) { 
    const key = import.meta.env.VITE_YOUTUBE_API_KEY;
    const playlistId = playlist;
    const max = 5;
    const insertPart = 'snippet';
    const [recentList, setRecentList] = useState([]);
    const navRef = useRef();

    useEffect(() => { 
        const searchVideos = async () => {
            try {
                const res = await fetch (`https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${playlistId}&part=${insertPart}&maxResult=${max}`
                ); 
                const data = await res.json()
                if (res.ok) {
                    let videos = []
                    data['items'].forEach((element) => {
                        videos.push(element.snippet.resourceId.videoId);
                    }); setRecentList(videos)
                } else {
                    console.log(error.message);
                }
                
            } catch(error) {
                console.log(error);
            }; 
        }; searchVideos();
    }, []);

    const handleScroll = (direction) => {
        if (direction === 'left') {
            navRef ? (navRef.current.scrollLeft -= 300) : null;
        } else {
            navRef ? (navRef.current.scrollLeft += 300) : null;
        }
    }

  return (
    
    <div className='flex flex-row justify-center md:justify-start'>
        <div className='my-auto'>
            <button onClick={() => handleScroll('left')}><SlArrowLeft className='text-3xl hover:text-fuchsia-500'/></button>
        </div>
        <div ref={navRef} className='md:flex 
        overflow-auto whitespace-nowrap scrollbar-none w-auto h-auto'>
        {recentList.map((video) => (
                <YouTube className='m-5' key={video} videoId={video}/>
        ))}
        </div>
        <div className='my-auto'>
            <button onClick={() => handleScroll('right')}><SlArrowRight className='text-3xl hover:text-fuchsia-500'/></button>
        </div>
    </div>
  )
};

