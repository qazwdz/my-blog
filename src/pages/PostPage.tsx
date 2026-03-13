import { useParams, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import type { Post } from '../types/post';
import ReactMarkdown from 'react-markdown';
import type { Comment } from '../types/comment';
// import { jsxDEV } from 'react/jsx-dev-runtime';

interface PostPageProps {
    posts: Post[];
    // 问号表示可选属性
    loading?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function PostPage({ posts, loading }: PostPageProps) {
    // React Router提供的自定义Hook
    const { id } = useParams<{id : string}>();
    const { user } = useAuth();
    // 用来保留后端获取到的多条评论
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState<string | null>(null);
    // 保留当前编辑的单条评论草稿
    const [newComment, setNewComment] = useState('');

    const post = posts.find(p => p.id === id);
    // console.log('PostPage render, posts:', posts, 'id from url', id, 'converted id', Number(id));

    const fetchComments = async() => {
        console.log('fetchComments called with id:', id);
        if (!id) return;
        console.log("Fetching comments for postId:", id);
        setCommentsLoading(true);
        try {
            // 问号之后的部分为查询字符串
            const response = await axios.get(`${API_URL}/comments?postId=${id}`);
            console.log('Fetched comments data:', response.data);
            setComments(response.data);
            setCommentsError(null);
        } catch (err) {
            setCommentsError('加载评论失败');
            console.error(err);
        } finally {
            setCommentsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        // 无害的防御性编程
        if (!user) {
            alert('请先登录');
            return;
        }
        if (!newComment.trim()) return;

        try {
            const commentToSend = {
                postId: id,
                author: user.username,
                content: newComment,
                createdAt: new Date().toISOString(),
            };
            console.log('Submitting comment:', commentToSend);
            const response = await axios.post(`${API_URL}/comments`, commentToSend);
            console.log('Submit response:', response.data);
            setComments(prev => [response.data, ...prev]);
            setNewComment('');
        } catch (err) {
            alert('发布评论失败');
            console.error(err);
        }
    }

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4 text-center">
                <p className="text-gray-500">加载文章...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold">文章不存在</h1>
                <Link to="/" className='text-blue-600 hover:underline mt-4 inline-block'>返回首页</Link>
            </div>
        );
    }

    return(
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Link to='/' className='text-blue-600 hover:underline mb-4 inline-block'>&larr;返回首页</Link>
            <article className="bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                {post.category && <span className='inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded mb-4'>分类:{post.category}</span>}
                <time className="text-sm text-gray-400 block mb-4">{post.date}</time>
                {/* 官方插件typography */}
                
                {/* <div className="prose lg:prose-lg">
                    <p>{post.content}</p>
                </div> */}
                <div className="markdown-body">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>

            <section className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">评论</h2>
                
                {commentsLoading && <p>加载评论中...</p>}
                {commentsError && <p className='text-red-500'>{commentsError}</p>}
                <div className="space-y-4 mb-6">
                    {comments.map(comment => (
                        <div key={comment.id} className="border-b border-gray-200 pb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{comment.author}</span>
                                <span className="text-sm text-gray-400">
                                    {/* 转换成符合本地环境的日期时间字符串 */}
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                        </div>
                    ))}
                    {comments.length === 0 && !commentsLoading && (
                        <p className="text-gray-500">暂无评论，快来抢沙发吧</p>
                    )}
                </div>

                {user ? (
                    <form onSubmit={handleSubmitComment} className="flex flex-col gap-3">
                        <textarea
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            placeholder='写下你的评论...'
                            rows={3}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <button
                            type='submit'
                            className='self-end bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
                        >提交评论</button>
                    </form>
                ) : (
                    <p className="text-gray-500">
                        <Link to='/login' className='text-blue-600 hover:underline'>登录</Link>后发表评论
                    </p>
                )}
            </section>


        </div>
    );
}