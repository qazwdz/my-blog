import React from 'react';
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext.tsx';
import './index.css'
import App from './App.tsx'

// !是非空断言，表示我确信这个元素一定存在
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
