export default function youtubeSearch() {
    const key = import.meta.env.YOUTUBE_API_KEY    
    const channelSearch = async () => {
    try {
        console.log(key);
        const res = await fetch (`https://www.googleapis.com/youtube/v3/channels?key=${key}&id=UCk28LohA5hlp-7aVN0lWQMQ&part=snippet&maxResults=10`,
            {method: 'GET',
            }
        ); 
        const data = await res.json()
        console.log(data);

    } catch(error) {    
        console.log(error);
    }
    }; channelSearch();
    }