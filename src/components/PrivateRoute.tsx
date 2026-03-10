import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    // 对应在AuthContext中定义的接口，解构赋值
    // 只要对象存在就会正确返回
    const { user } = useAuth();
    // replace 用户登录后不能退回到登录页
    return user ? <>{children}</> : <Navigate to='/login' replace />
}

