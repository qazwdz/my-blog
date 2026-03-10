import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface NewPostPageProps {
    onAddPost: (post: { title: string; summary: string; content: string; category: string; }) => void;
}

export default function NewPostPage({ onAddPost }: NewPostPageProps) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert("输入标题或内容不能为空");
            return;
        } 
        onAddPost({ title, summary, content, category });
        navigate('/');
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Link to="/" className='text-blue-600 hover:underline mb-4 inline-block'>&larr; 返回首页</Link>
            <h1 className="text-3xl font-bold mb-6">写新文章</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>
                        标题
                    </label>
                    <input 
                        type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none
                        focus:ring-2 focus:ring-blue-500' placeholder='请输入标题'
                    />
                </div>
                <div>
                    <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1'>
                        分类
                    </label>
                    <input 
                        type="text" id='category' value={category} onChange={(e) => setCategory(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none
                        focus:ring-2 focus:ring-blue-500' placeholder='例如技术，生活'
                    />
                </div>
                <div>
                    <label htmlFor="summary" className='block text-sm font-medium text-gray-700 mb-1'>摘要</label>
                    <input 
                        type="text" id='summary' value={summary} onChange={(e) => setSummary(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none
                        focus:ring-2 focus:ring-blue-500' placeholder='请输入摘要(可选)'
                        />
                </div>
                <div>
                    <label htmlFor="content" className='block text-sm font-medium text-gray-700 mb-1'>内容</label>
                    {/* rows是哪里来的 */}
                    <textarea 
                        id="content" rows={6} value={content} onChange={(e) => setContent(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none
                        focus:ring-2 focus:ring-blue-500' placeholder='请输入文章内容' 
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        type='submit' className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>
                        发布文章
                    </button>
                    <Link to='/' className='bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition text-center'>
                        取消
                    </Link>
                </div>
            </form>
        </div>
    );
} 

