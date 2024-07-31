import video from '../assets/My Movie.mp4';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts?limit=3');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className=''>
        <div className='videoText'>
          <div className=''>
            <video src={video} autoPlay loop muted/>
          </div>
          <div className='text'>
            <h1>Hardt4il</h1>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4 justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link 
              to={'/search'}
              className='text-lg text-fuchsia-500 hover:underline text-center'
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
