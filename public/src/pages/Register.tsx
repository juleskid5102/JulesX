import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../config/firebase'

/**
 * Register — v3 Light theme
 * Split layout: form left, promo panel right (navy)
 */
export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }

    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: name })
      navigate('/theo-doi')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi'
      if (message.includes('already-in-use')) {
        setError('Email này đã được sử dụng.')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      navigate('/theo-doi')
    } catch {
      setError('Đăng ký Google thất bại.')
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-background-light">
        <div className="w-full max-w-md space-y-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/90 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5" fill="white">
                <path d="M480-80 120-280v-400l360-200 360 200v400L480-80Zm-40-406v316l40 22 40-22v-316l280-154-40-22-280 154-280-154-40 22 280 154Zm40 74 278-154v-160L480-572 202-726v160l278 154Z"/>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase text-stone-900 font-display">
              Jules Studio
            </span>
          </Link>

          <div>
            <h1 className="text-3xl font-extrabold text-stone-900 font-display">Tạo Tài Khoản</h1>
            <p className="text-stone-500 mt-2 font-display">Đăng ký để theo dõi dự án và quản lý tài khoản</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg font-display">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 font-display">Họ và tên</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 font-display">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 font-display">Số điện thoại</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                placeholder="0901 234 567"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 font-display">Mật khẩu</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 font-display">Xác nhận mật khẩu</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all font-display disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : 'Đăng Ký'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200" /></div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background-light text-stone-400 font-display">hoặc</span>
            </div>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full border border-stone-200 rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-stone-50 transition-all font-display"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Đăng ký với Google
          </button>

          <p className="text-center text-stone-500 text-sm font-display">
            Đã có tài khoản?{' '}
            <Link to="/dang-nhap" className="text-primary font-medium hover:underline">Đăng nhập</Link>
          </p>
        </div>
      </div>

      {/* Right — Promo Panel (Navy) with showcase image */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-[#101122] p-12 relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-20" />
        <div className="relative z-10 text-center space-y-8 max-w-md">
          {/* Showcase image */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-6">
            <img
              src="/images/projects/lumina-store.jpg"
              alt="Lumina Store — Dự án mẫu"
              className="w-full h-48 object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-white font-display">
            Bắt đầu hành trình cùng Jules
          </h2>
          <div className="space-y-4 text-left">
            {['Theo dõi tiến độ dự án', 'Nhận thông báo realtime', 'Quản lý tài liệu dễ dàng'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="text-stone-300 font-display">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
