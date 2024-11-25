import React, { useState } from 'react';
import { Search, Tag, Clock, ArrowRight } from 'lucide-react';
import { BlogPost, BlogCategory } from './types';
import { BlogCard } from './BlogCard';

const categories: BlogCategory[] = [
  { id: 'cnc-tips', name: 'CNC Tips', count: 12 },
  { id: '3d-printing', name: '3D Printing', count: 15 },
  { id: 'industry-news', name: 'Industry News', count: 8 },
  { id: 'case-studies', name: 'Case Studies', count: 6 },
  { id: 'tutorials', name: 'Tutorials', count: 10 },
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Advanced CNC Machining Techniques for Complex Geometries',
    preview: 'Discover how modern CNC machining centers can tackle intricate designs with unprecedented precision. We explore the latest strategies for achieving tight tolerances and superior surface finishes.',
    image: 'https://images.unsplash.com/photo-1565439311799-e642315f9fe5?auto=format&fit=crop&q=80',
    category: 'cnc-tips',
    date: '2024-03-15',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'The Future of 3D Printing: Beyond Prototyping',
    preview: 'As additive manufacturing technology evolves, its applications extend far beyond rapid prototyping. Learn how industries are leveraging 3D printing for end-use parts and mass customization.',
    image: 'https://images.unsplash.com/photo-1631281956016-3cdc1b2fe5fb?auto=format&fit=crop&q=80',
    category: '3d-printing',
    date: '2024-03-12',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Material Selection Guide for CNC Projects',
    preview: 'Choosing the right material is crucial for CNC machining success. This comprehensive guide covers everything from aluminum alloys to exotic materials, helping you make informed decisions.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80',
    category: 'tutorials',
    date: '2024-03-10',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Sustainable Manufacturing: Green Initiatives in 3D Printing',
    preview: 'Explore how additive manufacturing is leading the charge in sustainable production. From recycled materials to reduced waste, discover the environmental benefits of 3D printing.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    category: 'industry-news',
    date: '2024-03-08',
    readTime: '4 min read',
  },
];

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-80 bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80"
            alt="Manufacturing Banner"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Insights and Innovations
            </h1>
            <p className="text-xl text-gray-200">
              in CNC and 3D Printing
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="flex-1 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-black focus:border-black"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(
                    category.id === selectedCategory ? null : category.id
                  )}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    category.id === selectedCategory
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Tag className="w-4 h-4 mr-1" />
                  {category.name}
                  <span className="ml-1 text-xs">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found matching your criteria.</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors">
              <span>Load More Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}