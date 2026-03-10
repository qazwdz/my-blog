import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    // 这里指定了初始值是字符串，所以不需要再使用泛型来指定
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // 在自定义Hook中解构出login函数
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 状态重置，先清空之前的错误信息
        setError('');
        setLoading(true);
        const success = await login(username, password);
        setLoading(false);
        if (success) {
            navigate('/');
        } else {
            setError('用户名或密码不能为空');
        }
    };

    return (

        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor="username" className='block text-sm font-medium text-gray-700 mb-1'>用户名</label>
                    <input 
                        type="text" 
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>密码</label>
                    <input 
                        type="password" 
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                {/* 大括号表示里面要执行JS代码 */}
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300'
                >
                    {loading ? '登录中...' : '登录'}
                </button>
                <p className="text-center text-sm text-gray-600">没有账号？随便填即可登录（模拟）</p>
            </form>
            <div className="mt-4 text-center">
                <Link to='/' className='text-blue-600 hover:underline'>返回首页</Link>
            </div>
        </div>               
    )
}











