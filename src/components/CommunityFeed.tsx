import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, ShieldCheck, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_POSTS = [
  {
    id: 1,
    author: { name: 'Imam Khalid', verified: true, avatar: 'bg-emerald-100 text-emerald-700' },
    content: 'Remember to recite Ayatul Kursi after every obligatory prayer. The protection it offers is immense, and it is a bridge to Jannah.',
    time: '2h ago',
    likes: 124,
    comments: 18
  },
  {
    id: 2,
    author: { name: 'Sister Fatima', verified: false, avatar: 'bg-purple-100 text-purple-700' },
    content: 'Just finished the 30-day Ruqyah detox plan. Feeling much lighter Alhamdulillah. Consistency is key!',
    time: '5h ago',
    likes: 89,
    comments: 5
  },
  {
    id: 3,
    author: { name: 'Dr. Ahmad (Hijama)', verified: true, avatar: 'bg-blue-100 text-blue-700' },
    content: 'Sunnah days for Hijama this month are coming up next week. Book your slots early!',
    time: '1d ago',
    likes: 210,
    comments: 42
  }
];

export const CommunityFeed = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(MOCK_POSTS);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: { name: 'Ahmed Yusuf', verified: false, avatar: 'bg-sand text-primary' },
      content: newPost,
      time: 'Just now',
      likes: 0,
      comments: 0
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="space-y-6">
      {/* Compose Post */}
      <div className="card-natural p-4 space-y-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-sand rounded-full flex items-center justify-center text-primary font-serif italic text-sm shrink-0">AY</div>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your spiritual journey..."
            className="w-full bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-sm mt-2 text-charcoal placeholder:text-stone/70"
            rows={2}
          />
        </div>
        <div className="flex justify-end pt-2 border-t border-border">
          <button
            onClick={handlePost}
            disabled={!newPost.trim()}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-colors ${newPost.trim() ? 'bg-primary text-white shadow-sm' : 'bg-sand text-stone cursor-not-allowed'}`}
          >
            Post
          </button>
        </div>
      </div>

      {/* Feed */}
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-natural p-5 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif italic font-bold text-sm ${post.author.avatar}`}>
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-charcoal flex items-center gap-1">
                    {post.author.name}
                    {post.author.verified && <ShieldCheck size={14} className="text-blue-500" />}
                  </h4>
                  <p className="text-[10px] text-stone">{post.time}</p>
                </div>
              </div>
              <button className="text-stone hover:text-charcoal"><MoreVertical size={16} /></button>
            </div>

            <p className="text-sm text-charcoal leading-relaxed">{post.content}</p>

            <div className="pt-3 flex items-center gap-6 border-t border-border">
              <button className="flex items-center gap-1.5 text-stone hover:text-primary transition-colors text-xs font-bold">
                <Heart size={16} /> {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-stone hover:text-primary transition-colors text-xs font-bold">
                <MessageSquare size={16} /> {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-stone hover:text-primary transition-colors text-xs font-bold ml-auto">
                <Share2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CommunityFeed;
