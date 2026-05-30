import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import CommentSection from '../components/CommentSection';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const currentUserId = user ? JSON.parse(user).id : null;

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => setPost(res.data)).catch(() => setError('Post not found'));
  }, [id]);

  const remove = async () => {
    await api.delete(`/posts/${id}`);
    navigate('/');
  };

  if (error) return <div className="max-w-4xl mx-auto py-20 text-center text-red-600">{error}</div>;
  if (!post) return <div className="max-w-4xl mx-auto py-20 text-center">Loading...</div>;

  const isOwner = currentUserId && post.author?._id === currentUserId;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Link to="/" className="text-slate-600 hover:text-slate-900">← Back to posts</Link>
      </div>
      <article className="bg-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-slate-500 mb-6">By {post.author?.name || 'Unknown'} · {new Date(post.createdAt).toLocaleDateString()}</div>
        <p className="text-slate-700 leading-8 whitespace-pre-line">{post.content}</p>
        {isOwner && (
          <div className="mt-6">
            <button onClick={remove} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
          </div>
        )}
      </article>
      <CommentSection postId={id} currentUserId={currentUserId} />
    </div>
  );
}
