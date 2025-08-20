import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BlogSection = () => {
  // ✅ Dummy research-backed posts
  const [posts, setPosts] = useState([
    {
      _id: "1",
      title: "The Psychology of Habits",
      excerpt: "How habits shape our daily decisions and long-term outcomes.",
      content: "Research from Duke University shows that up to 40% of our daily actions are based on habits, not conscious decisions. Habits can reinforce both positive and negative behavior, and creating 'keystone habits' like regular exercise can lead to broader positive lifestyle changes.",
      date: "2024-05-10",
      reads: 12,
    },
    {
      _id: "2",
      title: "Sleep and Cognitive Performance",
      excerpt: "Why good sleep is essential for memory, focus, and creativity.",
      content: "Studies by the National Institutes of Health demonstrate that sleep deprivation impairs working memory and problem-solving abilities. Deep sleep stages are crucial for memory consolidation and neural recovery.",
      date: "2024-06-02",
      reads: 8,
    },
    {
      _id: "3",
      title: "Digital Detox and Mental Health",
      excerpt: "The science behind reducing screen time for better wellbeing.",
      content: "Excessive screen time, especially on social media, has been linked to higher rates of anxiety and depression (American Psychological Association). Scheduled digital detoxes are shown to improve focus and reduce stress levels.",
      date: "2024-07-15",
      reads: 5,
    },
    {
      _id: "4",
      title: "The Power of Mindfulness",
      excerpt: "How mindfulness meditation rewires the brain.",
      content: "Harvard neuroscientists found that an 8-week mindfulness program increased gray matter density in areas associated with learning, memory, and emotion regulation. Mindfulness practices help reduce stress and enhance focus.",
      date: "2024-08-05",
      reads: 14,
    },
    {
      _id: "5",
      title: "Exercise and Brain Health",
      excerpt: "Why regular physical activity boosts mental clarity.",
      content: "According to research published in *PNAS*, aerobic exercise increases hippocampal volume, which is critical for memory formation. Exercise also improves mood by boosting endorphin and dopamine levels.",
      date: "2024-09-01",
      reads: 6,
    },
    {
      _id: "6",
      title: "Nutrition and Cognitive Function",
      excerpt: "The link between diet and mental sharpness.",
      content: "A Mediterranean diet rich in omega-3 fatty acids, antioxidants, and whole grains has been correlated with lower risk of cognitive decline and Alzheimer's disease. Diet impacts not just physical but also mental resilience.",
      date: "2024-10-12",
      reads: 10,
    },
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Newsletter form (still functional, but can later connect to backend)
  const handleSubscribe = async (e) => {
    e.preventDefault();
    // Placeholder — replace with API call later
    setMessage("Subscribed successfully!");
    setEmail("");
  };

  // ✅ Handle Read More (increments local read count)
  const handleReadMore = (post) => {
    setSelectedPost(post);
    setPosts((prev) =>
      prev.map((p) =>
        p._id === post._id ? { ...p, reads: p.reads + 1 } : p
      )
    );
  };

  return (
    <section className="py-16 px-6 bg-dark-500 text-gray-900">
      <h2 className="text-4xl text-white font-bold text-center mb-8">Latest Blog Posts</h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div key={post._id} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-3">{post.excerpt}</p>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(post.date).toDateString()}
            </p>
            <p className="text-sm text-blue-600">👁 {post.reads} reads</p>
            <button
              onClick={() => handleReadMore(post)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Read More
            </button>
          </motion.div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h3>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Subscribe
          </button>
        </form>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 text-gray-100 rounded-xl shadow-lg p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
              <p className="whitespace-pre-line">{selectedPost.content}</p>
              <button
                onClick={() => setSelectedPost(null)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
