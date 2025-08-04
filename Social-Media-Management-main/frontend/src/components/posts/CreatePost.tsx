import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiReply, setAiReply] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setAiReply('');

    try {
      const res = await axios.post('http://localhost:5000/api/posts', {
        author: 'user123', // hardcoded for now, replace with real user
        content,
      });

      setSuccess(true);
      setAiReply(res.data.aiComment.content);
      setContent('');
    } catch (err) {
      console.error('Error posting:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Write your question..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>

      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          ✅ Post created successfully!
          {aiReply && (
            <div className="mt-2 text-sm text-gray-800">
              🤖 <strong>AI Reply:</strong> {aiReply}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
