import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post._id}`} className="block border border-slate-200 rounded-xl p-5 hover:shadow-lg transition">
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      <p className="text-slate-700 mb-4">{post.content.slice(0, 140)}{post.content.length > 140 ? '...' : ''}</p>
      <div className="text-sm text-slate-500">By {post.author?.name || 'Unknown'} · {new Date(post.createdAt).toLocaleDateString()}</div>
    </Link>
  );
}
