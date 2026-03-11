import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// import type { Post } from '../types/post';
const API_URL = '/api';

export default function EditPostPage() {
  // 泛型参数是对象类型
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  // const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // JS对象字面量允许尾随逗号
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
  });

  useEffect(() => {
    // 在内部定义async函数并立即调用它，如果直接使用async会返回Promise不符合规则
    const fetchPost = async() => {
      try {
        // posts为哪个链接？我知道post是单个文章的界面
        const response = await axios.get(`${API_URL}/posts/${id}`);
        // ||可以过滤掉所有价值
        setFormData({
          title: response.data.title,
          summary: response.data.summary || '',
          content: response.data.content,
          category: response.data.category || '',
        });
      } catch(err) {
        setError('加载文章失败');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // 只有存在的时候才调用fetchPost,因为组件首次渲染时id可能为undefined
    if (id) fetchPost();
    // id为依赖数组，仅仅当id 改变时，副作用才会运行
  }, [id]);

  // []根据id计算属性名，将输入框的值赋给textarea的id属性值
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() && !formData.content.trim()) {
      alert('标题和内容不能为空');
      return;
    }
    setSaving(true);
    try {
      // 相对于put方法，部分更新
      await axios.patch(`${API_URL}/posts/${id}`), {
        ...formData,
        // 清理，保证后端数据清晰合理
        category: formData.category.trim() || undefined,
      };
      navigate(`/post/${id}`)
    } catch(err) {
      alert('保存失败');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) return <div className="text-center py-8">加载中...</div>
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>

  return (
    <div className="max-w-3xl mx-auto py-8 py-4">
      <Link to={`/post/${id}`} className='text-blue-600 hover:underline mb-4 inline-block'>&larr;返回文章</Link>
      <h1 className="text-3xl font-bold mb-6">编辑文章</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>标题</label>
          {/* required指定为必填项 */}
          <input type="text" id='title' value={formData.title} onChange={handleChange} 
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' required
          />
        </div>

        <div>
          <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1'>分类</label>
          <input type="text" id='category' value={formData.category} onChange={handleChange}
           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="例如：技术、生活（可选）"/>
        </div>

        <div>
          <label htmlFor="summary" className='block text-sm font-medium text-gray-700 mb-1'>摘要</label>
          <input type="text" id='summary' value={formData.summary} onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div>
          <label htmlFor="content" className='block text-sm font-medium text-gray-700 mb-1'>内容</label>
          <input type="text" id='content' value={formData.content} onChange={handleChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div className="flex-gap-4">
          <button type='submit' disabled={saving} className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50'>
            {saving ? '保存中...' : '保存'}
          </button>
          <Link to={`/post/${id}`} className='bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition text-center'>取消</Link>
        </div>
      </form>
    </div>
  );
} 

