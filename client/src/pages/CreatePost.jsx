import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post('/posts', { title, content });
    navigate(`/posts/${res.data._id}`);
  };

  return (
    <div className="max-w-3xl mx-auto py-14 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Create Post</h1>
        <form onSubmit={submit} className="space-y-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-4 border rounded-2xl" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows="10" className="w-full p-4 border rounded-2xl" />
          <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-2xl">Publish</button>
        </form>
      </div>
    </div>
  );
}
