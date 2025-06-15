<h1>📢 Social Media Mention-Based Chat Monitor</h1>
<p>A full-stack web application that fetches and displays public social media mentions of a specified handle (e.g., <code>@amazon</code>) in a unified, chat-style interface.</p>

<hr />

<h2>📌 Objective</h2>
<p>To build a system that detects and fetches mentions of a brand from supported social media platforms and displays them in a real-time chat-like UI.</p>

<hr />

<h2>🧩 System Overview</h2>

<h3>🔹 Frontend (React + Tailwind CSS)</h3>
<ul>
  <li>Accepts user input for a social media handle.</li>
  <li>Sends a request to the backend API.</li>
  <li>Displays results in a responsive, chat-style UI.</li>
  <li>Handles loading, error, and empty states.</li>
</ul>

<h3>🔹 Backend (Node.js + Express)</h3>
<ul>
  <li>API route: <code>/mentions?handle=@xyz</code></li>
  <li>Integrates platform-specific fetchers (Reddit and Twitter)</li>
  <li>Normalizes all responses into a unified JSON format</li>
  <li>Returns combined data to frontend</li>
</ul>

<h3>🔹 Fetcher Modules</h3>
<ul>
  <li><strong>Reddit Fetcher (<code>reddit.js</code>)</strong>
    <ul>
      <li>Uses <code>snoowrap</code></li>
      <li>Authenticated using OAuth2 (client ID, secret, refresh token)</li>
      <li>Searches posts/comments with the given handle</li>
    </ul>
  </li>
  <li><strong>Twitter Fetcher (<code>twitter.js</code>)</strong>
    <ul>
      <li>Uses <code>twitter-api-v2</code></li>
      <li>Authenticated via Bearer token</li>
      <li>Searches tweets mentioning the handle</li>
    </ul>
  </li>
</ul>

<hr />

<h2>📦 Normalized Mention Format</h2>
<pre><code>{
  "platform": "Twitter",
  "username": "techguy123",
  "profile_link": "https://twitter.com/techguy123",
  "followers": 5430,
  "post": "@amazon delivered super fast!",
  "timestamp": "2025-06-14T10:45:00Z",
  "mention_type": "public"
}
</code></pre>

<hr />

<h2>💾 Data Storage</h2>
<ul>
  <li><strong>Currently:</strong> In-memory (live fetch only)</li>
  <li><strong>Future:</strong>
    <ul>
      <li>Use MongoDB/Redis</li>
      <li>Caching and historical analysis</li>
      <li>Sentiment classification</li>
    </ul>
  </li>
</ul>

<hr />

<h2>⚙️ Tech Stack</h2>
<table>
  <thead>
    <tr><th>Layer</th><th>Tool</th></tr>
  </thead>
  <tbody>
    <tr><td>Frontend</td><td>React, Tailwind CSS</td></tr>
    <tr><td>Backend</td><td>Node.js, Express</td></tr>
    <tr><td>Reddit API</td><td>snoowrap</td></tr>
    <tr><td>Twitter API</td><td>twitter-api-v2</td></tr>
    <tr><td>Hosting</td><td>Vercel (frontend), Render (backend)</td></tr>
  </tbody>
</table>

<hr />

<h2>🚀 How to Run Locally</h2>

<h3>🔧 Backend Setup</h3>
<pre><code>git clone &lt;repo-url&gt;
cd server
npm install

# Create .env file
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_REFRESH_TOKEN=your_refresh_token
TWITTER_BEARER_TOKEN=your_twitter_bearer_token

node app.js
</code></pre>

<h3>💻 Frontend Setup</h3>
<pre><code>cd ../frontend
npm install
npm run dev
</code></pre>

<hr />

<h2>📈 Future Enhancements</h2>
<ul>
  <li>Real-time polling or WebSocket updates</li>
  <li>Sentiment analysis using LLM/NLP</li>
  <li>Additional platform support (Threads, LinkedIn)</li>
  <li>Caching layer (Redis)</li>
</ul>

<hr />

<h2>🧑‍💻 Author</h2>
<p><strong>Faizan Shaikh</strong></p>
