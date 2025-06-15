import React from 'react';

const Chat = ({ mention }) => {
  const isTwitter = mention.platform === 'X/Twitter';
  const isRight = isTwitter;

  return (
    <div className={`flex ${isRight ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`max-w-md p-4 rounded-2xl shadow-md ${isRight ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
        <div className="font-semibold mb-1">{mention.username} ({mention.platform})</div>
        <div className="text-sm">{mention.post}</div>
        <div className="text-xs mt-1 opacity-60">{new Date(mention.timestamp).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default Chat;
