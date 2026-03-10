import { createContext, useContext, useState }  from 'react';
import type { ReactNode } from 'react'

interface User {
    username: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

//这也是没学过的知识
// 创建Context，一方提供数据，一方消费数据
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 传入一个对象，从对象中取出children属性，作为变量使用(对象解构赋值）
export function AuthProvider({ children }: { children: ReactNode }) {
    // useState的惰性初始化，通过传入函数减少性能损耗
    const [user, setUser] = useState<User | null>(() => {
        // 获取JSON格式的数据并转换成JS对象
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (username: string, password: string) => {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                if (username.trim() && password.trim()) {
                    // 对象属性简写，创建一个带有username属性的对象
                    const user = { username };
                    setUser(user);
                    // 将JS对象转化成JSON，然后存入本地存储,setItem里面括号对应的key value
                    localStorage.setItem('user', JSON.stringify(user));
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 500)
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

//消费数据
// 这是用于调试过程中的断言，所以不需要捕获错误
// 发现错误的时候直接修改代码结构就可以了
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

