// useAuth — Custom Claims based auth (guest/user/admin)
// Đọc role từ JWT custom claims, không query Firestore
import { useState, useEffect, useContext, createContext, type ReactNode } from 'react'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    updateProfile,
    type User,
} from 'firebase/auth'
import { auth } from '../config/firebase'

type Role = 'guest' | 'user' | 'admin'

interface AuthContextType {
    user: User | null
    role: Role
    loading: boolean
    login: (email: string, password: string) => Promise<any>
    register: (email: string, password: string, displayName?: string) => Promise<any>
    loginWithGoogle: () => Promise<any>
    logout: () => Promise<void>
    isAuthenticated: boolean
    isAdmin: boolean
    getIdToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<Role>('guest')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser)
            if (firebaseUser) {
                try {
                    const tokenResult = await firebaseUser.getIdTokenResult()
                    if (tokenResult.claims.admin === true) {
                        setRole('admin')
                    } else {
                        setRole('user')
                    }
                } catch (err) {
                    console.error('Failed to get token claims:', err)
                    setRole('user')
                }
            } else {
                setRole('guest')
            }
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const register = async (email: string, password: string, displayName?: string) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        if (displayName) {
            await updateProfile(cred.user, { displayName })
        }
        return cred
    }

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const logout = async () => {
        return signOut(auth)
    }

    const getIdToken = async (): Promise<string | null> => {
        if (!user) return null
        return user.getIdToken()
    }

    const value: AuthContextType = {
        user,
        role,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user,
        isAdmin: role === 'admin',
        getIdToken,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
