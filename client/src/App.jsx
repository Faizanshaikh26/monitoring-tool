
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chat from './components/Chat';

function App() {
  const [handle, setHandle] = useState('@amazon');
  const [mentions, setMentions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMentions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://monitoring-tool-oo3r.onrender.com/mentions?handle=${handle}`);
      setMentions(res.data);
      
    } catch (err) {
      console.error(err);
      setMentions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMentions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-center">🔍 Mentions of {handle}</h1>
        <div className="flex gap-2 mb-4">
          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="@brand"
          />
          <button
            onClick={fetchMentions}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        <div className="h-[60vh] overflow-y-auto space-y-2">
          {loading ? (
            <div>Loading...</div>
          ) : (
            mentions.map((m, i) => <Chat key={i} mention={m} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
