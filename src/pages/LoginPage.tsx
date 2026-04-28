import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Loader } from '../components/ui/Loader';
import { DEMO_EMAIL, DEMO_PASSWORD, isDemoMode } from '../services/firebase';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, user, clearError } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
  };

  return (
    <div className="bg-mesh font-body text-on-surface min-h-screen flex flex-col">
      {/* Loading overlay */}
      {isLoading && <Loader fullScreen color="#006068" label="Authenticating…" />}

      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          {/* Branding */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 primary-gradient flex items-center justify-center rounded-xl shadow-sm">
              <span className="material-symbols-outlined text-white text-2xl">medical_services</span>
            </div>
            <div className="space-y-1">
              <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-background">
                Clinical Atelier
              </h1>
              <p className="text-on-surface-variant text-sm">
                Precision tools for modern healthcare professionals.
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 md:p-10 shadow-[0px_12px_32px_rgba(25,28,30,0.04)] border border-outline-variant/10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <label
                    className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                      mail
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@clinic.com"
                      required
                      autoComplete="email"
                      className="w-full pl-11 pr-4 py-3 bg-surface-container-low border-none outline-none rounded-lg text-sm transition-all duration-200 focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary placeholder:text-outline"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <a href="#" className="text-xs font-medium text-tertiary hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                      lock
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      className="w-full pl-11 pr-11 py-3 bg-surface-container-low border-none outline-none rounded-lg text-sm transition-all duration-200 focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary placeholder:text-outline"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="rounded-sm border-outline-variant text-primary focus:ring-primary/20 h-4 w-4"
                />
                <label htmlFor="remember" className="text-sm text-on-surface-variant">
                  Keep me signed in for 30 days
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 bg-error-container rounded-lg">
                  <p className="text-xs font-medium text-on-error-container flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 primary-gradient text-white font-semibold rounded-lg shadow-sm hover:opacity-95 active:scale-[0.98] transition-all duration-200 text-sm tracking-wider uppercase disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In…
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Quick Access Credentials */}
            <div className="mt-8 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
              <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-3">Quick Access Credentials</p>
              <div className="space-y-3">
                <CredentialItem label="Email" value={DEMO_EMAIL} />
                <CredentialItem label="Password" value={DEMO_PASSWORD} />
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-8 pt-8 border-t border-outline-variant/20 flex flex-col gap-4">
              <p className="text-center text-xs text-on-surface-variant">
                Secure, HIPAA-compliant gateway
              </p>
              <div className="flex justify-center gap-4 text-[10px] text-outline font-semibold tracking-widest uppercase">
                <span className="opacity-50">HIPAA Compliant</span>
                <span className="opacity-30">|</span>
                <span className="opacity-50">SOC 2 Type II</span>
                <span className="opacity-30">|</span>
                <span className="opacity-50">ISO 27001</span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="flex justify-center gap-6">
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <footer className="p-8 flex justify-between items-end">
        <div className="hidden md:block">
          <p className="text-xs text-outline font-medium tracking-widest uppercase">
            System Status: All systems operational
          </p>
        </div>
        <div className="max-w-xs text-right hidden lg:block">
          <p className="text-[10px] leading-relaxed text-outline">
            © 2024 Atelier Health Solutions. Clinical Atelier is a registered trademark.
            Designed for precision, built for patient care.
          </p>
        </div>
      </footer>
    </div>
  );
};

const CredentialItem: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between bg-surface-container-lowest p-2 rounded-lg border border-outline-variant/5">
      <div className="flex flex-col">
        <span className="text-[9px] text-outline font-bold uppercase">{label}</span>
        <span className="text-xs font-mono text-on-surface select-all">{value}</span>
      </div>
      <button
        onClick={handleCopy}
        className={`p-1.5 rounded-md transition-all ${
          copied ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-surface-container-high text-outline'
        }`}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        <span className="material-symbols-outlined text-[16px]">
          {copied ? 'check' : 'content_copy'}
        </span>
      </button>
    </div>
  );
};
