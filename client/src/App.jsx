import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chat from './components/Chat';

function App() {
  const [handle, setHandle] = useState('@amazon');
  const [mentions, setMentions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMentions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://monitoring-tool-oo3r.onrender.com/mentions?handle=${handle}`);
      if (res.data.length === 0) {
        setError('No mentions found for this handle.');
      }
      setMentions(res.data);
    } catch (err) {
      console.error(err);
      setMentions([]);
      setError('Something went wrong. Please try again later.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMentions();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchMentions();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">🔍 Mentions of {handle}</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 border rounded text-sm sm:text-base"
            placeholder="@brand"
          />
          <button
            onClick={fetchMentions}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm sm:text-base"
          >
            Search
          </button>
        </div>

        <div className="h-[60vh] overflow-y-auto space-y-2">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : mentions.length > 0 ? (
            mentions.map((m, i) => <Chat key={i} mention={m} />)
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
