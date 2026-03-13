import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useAuth } from '../hooks/useAuth'

/**
 * Register — From 10-register.html (Stitch)
 * Split-panel layout, NOW WIRED to Firebase Auth
 */
export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, loginWithGoogle, user } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  if (user) {
    navigate('/', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !password) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }
    if (password.length < 6) {
      setError('Mật khẩu tối thiểu 6 ký tự')
      return
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    setError('')
    setLoading(true)
    try {
      await register(email, password, fullName)
      // TODO: optionally save phone to Firestore via API
      navigate('/')
    } catch (err: any) {
      const code = err?.code || ''
      if (code === 'auth/email-already-in-use') {
        setError('Email đã được sử dụng')
      } else if (code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu, tối thiểu 6 ký tự')
      } else if (code === 'auth/invalid-email') {
        setError('Email không hợp lệ')
      } else {
        setError(err.message || 'Đăng ký thất bại')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Đăng nhập Google thất bại')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white text-slate-900">
      <Navbar />

      {/* Split Layout — exact from 10-register.html lines 65-139 */}
      <main className="min-h-screen flex flex-col md:flex-row pt-20">
        {/* Left Panel: Benefits */}
        <div className="w-full md:w-1/2 bg-[#0A0A0A] flex flex-col justify-center px-8 lg:px-24 py-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />
          <div className="relative z-10">
            <h2 className="font-heading text-6xl lg:text-8xl text-white leading-none mb-12 tracking-tighter">
              TẠO<br />TÀI KHOẢN
            </h2>
            <ul className="space-y-6 max-w-md">
              <li className="flex items-center gap-4 text-slate-400 font-normal text-lg">
                <span className="material-symbols-outlined text-primary text-[24px]">check</span>
                Theo dõi tiến độ dự án realtime
              </li>
              <li className="flex items-center gap-4 text-slate-400 font-normal text-lg">
                <span className="material-symbols-outlined text-primary text-[24px]">check</span>
                Tải hợp đồng &amp; tài liệu
              </li>
              <li className="flex items-center gap-4 text-slate-400 font-normal text-lg">
                <span className="material-symbols-outlined text-primary text-[24px]">check</span>
                Chat trực tiếp với team
              </li>
            </ul>
          </div>
        </div>

        {/* Right Panel: Registration Form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 lg:px-24 py-20">
          <div className="max-w-[480px] w-full mx-auto">
            <h3 className="font-heading text-4xl text-black mb-10">Đăng Ký</h3>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="relative group">
                <input
                  className="peer block w-full appearance-none border-0 border-b-2 border-slate-200 bg-transparent py-4 px-0 text-black focus:border-black focus:outline-none focus:ring-0 text-lg"
                  id="fullname"
                  placeholder=" "
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
                <label
                  className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-slate-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-black"
                  htmlFor="fullname"
                >
                  Họ và Tên
                </label>
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  className="peer block w-full appearance-none border-0 border-b-2 border-slate-200 bg-transparent py-4 px-0 text-black focus:border-black focus:outline-none focus:ring-0 text-lg"
                  id="email"
                  placeholder=" "
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <label
                  className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-slate-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-black"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>

              {/* Phone */}
              <div className="relative group">
                <input
                  className="peer block w-full appearance-none border-0 border-b-2 border-slate-200 bg-transparent py-4 px-0 text-black focus:border-black focus:outline-none focus:ring-0 text-lg"
                  id="phone"
                  placeholder=" "
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
                <label
                  className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-slate-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-black"
                  htmlFor="phone"
                >
                  Số điện thoại
                </label>
              </div>

              {/* Password */}
              <div className="relative group">
                <input
                  className="peer block w-full appearance-none border-0 border-b-2 border-slate-200 bg-transparent py-4 px-0 text-black focus:border-black focus:outline-none focus:ring-0 text-lg pr-10"
                  id="password"
                  placeholder=" "
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <label
                  className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-slate-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-black"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-4 text-slate-400 cursor-pointer hover:text-black transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <input
                  className="peer block w-full appearance-none border-0 border-b-2 border-slate-200 bg-transparent py-4 px-0 text-black focus:border-black focus:outline-none focus:ring-0 text-lg"
                  id="confirm_password"
                  placeholder=" "
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
                <label
                  className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-slate-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-black"
                  htmlFor="confirm_password"
                >
                  Xác nhận mật khẩu
                </label>
              </div>

              {/* Submit & Google SSO */}
              <div className="pt-6 space-y-4">
                <button
                  className="w-full bg-black text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ĐANG ĐĂNG KÝ...
                    </>
                  ) : (
                    'ĐĂNG KÝ'
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-slate-200" />
                  <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">HOẶC</span>
                  <div className="flex-grow border-t border-slate-200" />
                </div>

                {/* Google SSO */}
                <button
                  className="w-full border-2 border-slate-200 bg-white text-black py-4 text-sm font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors disabled:opacity-50"
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Đăng ký với Google
                </button>
              </div>

              <p className="text-center pt-8 text-slate-500 text-sm">
                Đã có tài khoản?{' '}
                <Link
                  to="/dang-nhap"
                  className="text-black font-bold border-b border-black hover:text-primary hover:border-primary transition-colors"
                >
                  Đăng nhập
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
