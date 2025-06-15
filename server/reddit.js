const snoowrap = require('snoowrap');

const reddit = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
});

async function fetchRedditMentions(handle) {
  const posts = await reddit.search({ query: handle, sort: 'new', time: 'day', limit: 10 });

  return posts.map(post => ({
    platform: 'Reddit',
    username: post.author.name,
    profile_link: `https://reddit.com/u/${post.author.name}`,
    followers: null, 
    post: post.title || post.selftext,
    timestamp: new Date(post.created_utc * 1000).toISOString(),
    mention_type: 'public',
  }));
}

module.exports = fetchRedditMentions;
