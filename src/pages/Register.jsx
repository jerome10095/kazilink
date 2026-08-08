import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Reveal from '../components/animations/Reveal';
import { User, Mail, Lock, Briefcase, ArrowRight } from 'lucide-react';

export default function Register() {
  return (
    <>
      <Helmet>
        <title>Register - Join KaziLink</title>
      </Helmet>

      <section className="min-h-[calc(100vh-5rem)] flex items-center section-padding">
        <div className="container-custom max-w-md mx-auto">
          <Reveal>
            <div className="card p-8">
              <div className="text-center mb-8">
                <h1 className="heading-md">Join KaziLink</h1>
                <p className="text-ink/60 mt-2">Create your account to get started</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                    <input
                      type="password"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      placeholder="Create a password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1">I am a...</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                    <select className="w-full pl-12 pr-4 py-3 rounded-xl border border-paper-dim focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 appearance-none">
                      <option value="">Select one</option>
                      <option value="worker">Worker</option>
                      <option value="employer">Employer</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-ink/60">Already have an account?</span>
                <Link to="/login" className="text-primary-500 font-medium hover:underline ml-1">
                  Log in
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}