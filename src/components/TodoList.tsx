//TodoList小项目暂存于此


// import { useState } from 'react';

// interface todo {
//     id: number;
//     text: string;
//     completed: boolean;
// }

// export default function TodoList() {
//     const [todos, setTodos] = useState<todo[]>([
//         {id: 1, text: 'js学习', completed: true}
//     ]);
    
//     const [inputValue, setInputValue] = useState('');

//     const addTodo = () => {
//         if (inputValue.trim() === '') return false;

//         const newTodo: todo = {
//             id: Date.now(),
//             text: inputValue,
//             completed: false,
//         }
//         setTodos([...todos, newTodo]);
//         setInputValue('');
//     }

//     const toggleTodo = (id: number) => {
//         setTodos(
//             todos.map(todo => 
//                 todo.id === id ? {...todo, completed: !todo.completed } : todo
//             )
//         )
//     }

//     const deleteTodo = (id: number) => {
//         setTodos(
//             todos.filter(todo => todo.id !== id)
//         )
//     }

//     //虽然是常量，但是只在每次组件渲染时有效，而不是在整个应用生命周期保持不变
//     const countTodo = todos.filter(todo => !todo.completed).length;


//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
//             <h1 className="text-2xl font-bold text-gray-800 mb-4">我的待办清单</h1>
//             <div className="text-xl text-gray-400 mb-4">未完成的任务数量:{countTodo}</div>
            
//             <div className="flex gap-2 mb-6">
//                 <input 
//                     type="text" 
//                     placeholder='添加新任务...'
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyDown={(e) => e.key === 'Enter' && addTodo()}
//                     value={inputValue}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                     onClick={addTodo}
//                     //为什么背景显示没有反映出来，按理内联样式的优先级应该更高啊
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >添加</button>
//             </div>
    
//             <ul className="space-y-2">
//                 {todos.map(todo => (
//                     <li
//                         key={todo.id}
//                         className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                     >
//                         <div className="flex items-center gap-3">
//                             <input 
//                                 type="checkbox"
//                                 checked={todo.completed}
//                                 onChange={() => toggleTodo(todo.id)}
//                                 className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
//                             />
//                             <span
//                                 className={`text-gray-700 ${todo.completed ? 'line-through text-gray-400' : ''}`}
//                             >{todo.text}</span>
//                         </div>
//                         <button
//                             onClick={() => deleteTodo(todo.id)}
//                             className="text-red-500 hover:text-red-700 font-medium"
//                         >删除</button>
//                     </li>
//                 ))}
//             </ul>
//             {todos.length === 0 && (
//                 <p className="text-center text-gray-500 mt-4">暂无代办，添加一条吧</p>
//             )}
//         </div>
//     )
// }

// import { useState } from 'react';

// interface Todo {
//     id: number;
//     text: string;
//     completed: boolean;
// }

// export default function TodoList() {
//     const [todos, setTodos] = useState<Todo[]>([
//         { id: 1, text: 'js学习', completed: true },
//         { id: 2, text: '阿斯蒂芬', completed: false },
//     ]);
    
//     const [inputValue, setInputValue] = useState('');

//     const addTodo = () => {
//         if (inputValue.trim() === '') return;
//         const newTodo: Todo = {
//             id: Date.now(),
//             text: inputValue,
//             completed: false,
//         };
//         setTodos([...todos, newTodo]);
//         setInputValue('');
//     };

//     const toggleTodo = (id: number) => {
//         setTodos(
//             todos.map(todo =>
//                 todo.id === id ? { ...todo, completed: !todo.completed } : todo
//             )
//         );
//     };

//     const deleteTodo = (id: number) => {
//         setTodos(todos.filter(todo => todo.id !== id));
//     };

//     const countTodo = todos.filter(todo => !todo.completed).length;

//     return (
//         <div style={{ maxWidth: '28rem', margin: '2.5rem auto', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
//             <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>我的待办清单</h1>
//             <div style={{ fontSize: '1.25rem', color: '#9ca3af', marginBottom: '1rem' }}>未完成的任务数量: {countTodo}</div>
            
//             <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
//                 <input
//                     type="text"
//                     placeholder="添加新任务..."
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyDown={(e) => e.key === 'Enter' && addTodo()}
//                     style={{
//                         flex: 1,
//                         padding: '0.5rem 1rem',
//                         border: '1px solid #d1d5db',
//                         borderRadius: '0.5rem',
//                         outline: 'none',
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
//                     onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
//                 />
//                 <button
//                     onClick={addTodo}
//                     style={{
//                         padding: '0.5rem 1.5rem',
//                         backgroundColor: '#2563eb',
//                         color: 'white',
//                         borderRadius: '0.5rem',
//                         border: 'none',
//                         cursor: 'pointer',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
//                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
//                 >
//                     添加
//                 </button>
//             </div>
    
//             <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                 {todos.map(todo => (
//                     <li
//                         key={todo.id}
//                         style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             padding: '0.75rem',
//                             backgroundColor: '#f9fafb',
//                             borderRadius: '0.5rem',
//                         }}
//                     >
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
//                             <input
//                                 type="checkbox"
//                                 checked={todo.completed}
//                                 onChange={() => toggleTodo(todo.id)}
//                                 style={{ width: '1.25rem', height: '1.25rem' }}
//                             />
//                             <span
//                                 style={{
//                                     color: '#374151',
//                                     textDecoration: todo.completed ? 'line-through' : 'none',
//                                     color: todo.completed ? '#9ca3af' : '#374151',
//                                 }}
//                             >
//                                 {todo.text}
//                             </span>
//                         </div>
//                         <button
//                             onClick={() => deleteTodo(todo.id)}
//                             style={{
//                                 color: '#ef4444',
//                                 background: 'none',
//                                 border: 'none',
//                                 cursor: 'pointer',
//                                 fontWeight: '500',
//                             }}
//                             onMouseEnter={(e) => e.currentTarget.style.color = '#b91c1c'}
//                             onMouseLeave={(e) => e.currentTarget.style.color = '#ef4444'}
//                         >
//                             删除
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             {todos.length === 0 && (
//                 <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '1rem' }}>暂无代办，添加一条吧</p>
//             )}
//         </div>
//     );
// }


