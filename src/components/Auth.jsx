import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { LogIn, UserPlus, Mail, Lock, Sparkles, CheckCircle } from 'lucide-react'

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp, signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password)
      
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              MiniTask
            </h1>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 text-xl font-semibold">
              Organize your day, one task at a time
            </p>
            <p className="text-gray-600 text-base">
              Simple, beautiful task management for everyone
            </p>
          </div>
        </div>
        
        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-8">
          {/* Tab Switcher */}
          <div className="flex bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                !isSignUp 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                isSignUp 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="flex items-center h-12">
                <div className="flex items-center justify-center w-10 h-full">
                  <Mail className="text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input flex-1 h-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="flex items-center h-12">
                <div className="flex items-center justify-center w-10 h-full">
                  <Lock className="text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input flex-1 h-full"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 text-base font-semibold"
            >
              {loading ? (
                <div className="flex items-center space-x-3">
                  <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                  <span>{isSignUp ? 'Create your account' : 'Sign in to your account'}</span>
                </div>
              )}
            </button>
          </form>

          {/* Features */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-gray-700 font-semibold text-center">Why choose MiniTask?</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Simple and intuitive interface</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Drag and drop task management</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">Secure cloud storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth 