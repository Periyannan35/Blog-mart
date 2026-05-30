import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts').then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Latest Posts</h1>
          <p className="text-slate-600">Browse recent blog posts and share your thoughts.</p>
        </div>
        <Link to="/create" className="bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-500">Create Post</Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
