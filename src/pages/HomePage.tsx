import { Link } from 'react-router-dom';
import type { Post } from '../types/post';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

interface HomePageProps {
    posts: Post[];
    loading: boolean;
    error: string | null;
    onDeletePost: (id: string) => void;
}

export default function HomePage({ posts, loading, error, onDeletePost }: HomePageProps) {
    const { user, logout } = useAuth();
    const [selectedCategory, SetSelectedCategory] = useState('全部');

    // Set自动去重,map收集category属性
    // Set包含underfined项，需要再次过滤掉
    const categories = ['全部', ...new Set(posts.map(post => post.category).filter(Boolean))];
    // 另一种写法，is类型谓词，如果过滤器返回true，那么cat一定为string，也是过滤掉所有假值的元素
    //     const categories = ['全部', ...new Set(
    //     posts.map(post => post.category).filter((cat): cat is string => !!cat)
    // )];

    const filterPosts = selectedCategory === '全部'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

    if (error) {
        console.error('显示错误UI');
        return (
            <div className="max-x-3xl mx-auto py-8 px-4 text-center">
                <p className="text-red-500">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'                     
                >重试</button>
            </div>      
        );
    }

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4 text-center">
                <p className="text-gray-500">加载中...</p>
            </div>          
        );
    }

    return (
        <>
            {user && <button onClick={logout}
            className='fixed top-8 right-103 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition z-50'
            >登出</button>}
            <div className="max-w-3xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold mb-4">我的博客</h1>
                    {/* 这里也可以用三目运算符来实现 */}
                    {/* 可以去掉/成为相对路径，也能正常返回相应链接 */}
                    {!user && <Link to='/login' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4'>未登录？点击这里</Link>}
                    {user && <Link to='/new' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4'>写新文章</Link>}
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => SetSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition
                        ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{cat}</button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filterPosts.map(post => (
                        <article key={post.id} className='bg-white p-6 rounded-lg shadow hover:shadow-md transition relative'>
                            <Link to={`/post/${post.id}`}>
                                <h2 className="text-xl font-semibold text-blue-600 hover:underline mb-2">{post.title}</h2>
                            </Link>

                           <div className="flex items-center justify-between">
                                <time className="text-sm text-gray-400">{post.date}</time>
                                {post.category && (
                                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                                        {post.category}
                                    </span>
                                )}
                            </div>

                            {user && (
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Link to={`/edit/${post.id}`} className='text-blue-500 hover:text-blue-700 text-sm' aria-label='编辑'>编辑</Link>
                                    <button onClick={() => onDeletePost(post.id)} className='text-red-500 hover:text-red-700 text-sm' aria-label="删除">删除</button>
                                </div>
                            )}
                        </article>
                    ))}
                </div>



                {posts.length === 0 && <p className='text-center text-gray-500 mt-8'>暂无文章，快来写一篇吧</p>}
            </div>
        </>
    )
} 