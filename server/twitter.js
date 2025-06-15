const { TwitterApi } = require('twitter-api-v2');
const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function fetchTwitterMentions(handle) {
  try {
    const results = await twitterClient.v2.search(handle, {
      max_results: 10,
      'tweet.fields': 'created_at,author_id',
      expansions: ['author_id'],
      'user.fields': 'username,public_metrics'
    });

    const tweets = results?.data?.data;
    const users = results?.data?.includes?.users || [];

    if (!Array.isArray(tweets)) return [];

    const userMap = new Map(users.map(user => [user.id, user]));

    return tweets.map(tweet => {
      const user = userMap.get(tweet.author_id) || {};
      return {
        platform: 'X/Twitter',
        username: user.username || 'unknown',
        profile_link: user.username ? `https://twitter.com/${user.username}` : '',
        followers: user.public_metrics?.followers_count || 0,
        post: tweet.text,
        timestamp: tweet.created_at,
        mention_type: 'public',
      };
    });
  } catch (err) {
    console.error('❌ Twitter API error:', err?.data || err);
    return [];
  }
}

module.exports = fetchTwitterMentions;
