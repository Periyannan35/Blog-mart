import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CommentSection({ postId, currentUserId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const loadComments = async () => {
    const res = await api.get(`/comments/${postId}`);
    setComments(res.data);
  };

  useEffect(() => { loadComments(); }, [postId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await api.post('/comments', { text, postId });
    setComments([res.data, ...comments]);
    setText('');
  };

  const remove = async (id) => {
    await api.delete(`/comments/${id}`);
    setComments(comments.filter((c) => c._id !== id));
  };

  return (
    <section className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Comments</h3>
      <form onSubmit={submit} className="mb-4">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Add a comment" rows="4" />
        <button type="submit" className="mt-2 bg-slate-900 text-white px-4 py-2 rounded-lg">Submit</button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="border border-slate-200 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{comment.user?.name || 'Guest'}</span>
              {comment.user?._id === currentUserId && (
                <button onClick={() => remove(comment._id)} className="text-red-600 hover:underline">Delete</button>
              )}
            </div>
            <p className="text-slate-700">{comment.text}</p>
            <div className="text-xs text-slate-500 mt-2">{new Date(comment.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
