import { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [postText, setPostText] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/posts', {
        text: postText,
      });

      setResponse(res.data.aiResponse);
      setPostText('');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Create a Post</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Ask something..."
        rows={4}
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="font-bold">AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
