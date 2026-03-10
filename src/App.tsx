import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import type { Post } from './types/post';
import NewPostPage from './pages/NewPostPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import EditPostPage from './pages/EditPostPage';
// import { initialPosts } from './data/posts';

const API_URL = '/api/posts';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 网络请求可能失败，需要用到try catch语句
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const reponse = await axios.get<Post[]>(API_URL);
      setPosts(reponse.data);
      setError(null);
    } catch (err) {      
      console.error('Caught error', err);
      setError('获取文章失败，请稍后重试');

    } finally {
      setLoading(false);
    }
  };

  //组件加载时自动获取文章数据
  // 这点不懂，需要看React教程学习
  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (newPost: Omit<Post, 'id' | 'date'>) => {
    try {
//   泛型工具类型，基于原类型创建一个新类型，并排除id和date属性
      const postToSend = {
        ...newPost,
        // 转换成字符串，然后以字符T拆分成一个数组并取第一个元素
        date: new Date().toISOString().split("T")[0],
      };
      //将postToSend发送给服务器
      const response = await axios.post<Post>(API_URL, postToSend);
      setPosts(prevPosts => [...prevPosts, response.data]);
    } catch (err) {
      setError('发布文章失败，请稍后重试');
      console.error(err);
    }
  };

  // 删除文章
  const deletePost = async (id: string) => {
    try {
      // 删除指定链接的id
      await axios.delete(`${API_URL}/${id}`);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    } catch (err) {
      setError('删除文章失败，请稍后重试');
      console.error(err);
    }
  }

  return (
    // element指定路径匹配时要渲染的组件
    // Route顺序，具体路径优先，根路径最后
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>

          <Route path='/new' element={<PrivateRoute><NewPostPage onAddPost={addPost} /></PrivateRoute>} />

          <Route path='/post/:id' element={<PostPage posts={posts} />}/>

          <Route path='/edit/:id' element={<PrivateRoute><EditPostPage /></PrivateRoute>} />

          <Route path='/' 
            element={
              <HomePage 
                posts={posts}
                loading={loading}
                error={error}
                onDeletePost={deletePost}              
          />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

  // const [posts, setPosts] = useState<Post[]>(initialPosts);

  // //泛型工具类型，基于原类型创建一个新类型，并排除id和date属性
  // const addPost = (newPost: Omit<Post, 'id' | 'date'>) => {
  //   const post: Post = {
  //     ...newPost,
  //     id: Date.now(),
  //     // 转换成字符串，然后以字符T拆分成一个数组并取第一个元素
  //     date: new Date().toISOString().split('T')[0],
  //   };
  //   setPosts([...posts, post]);
  // };

  // return (
  //   <BrowserRouter>
  //     <div className="min-h-screen bg-gray-50">
  //       <Routes>
  //         <Route path='/' element={<HomePage posts={posts}/> } />
  //         <Route path='/post/:id' element={<PostPage posts={posts}/> } />
  //         <Route path='/new' element={<NewPage onAddPost={addPost}/> } />
  //       </Routes>
  //     </div>
  //   </BrowserRouter>
  // )
}