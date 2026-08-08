import { Helmet } from 'react-helmet-async';
import Reveal from '../components/animations/Reveal';
import { BookOpen, Users, Shield, TrendingUp, DollarSign, MessageCircle, Award, Briefcase, CheckCircle } from 'lucide-react';

const courses = [
  { icon: MessageCircle, title: 'Customer Service', desc: 'Learn effective communication and conflict resolution.' },
  { icon: Shield, title: 'Workplace Ethics', desc: 'Understand workplace standards and compliance.' },
  { icon: TrendingUp, title: 'Financial Literacy', desc: 'Budgeting, savings, and investment planning.' },
  { icon: BookOpen, title: 'Digital Literacy', desc: 'Basic computer and digital skills for the modern workplace.' },
  { icon: Award, title: 'Leadership', desc: 'Develop leadership and team management skills.' },
  { icon: Users, title: 'Entrepreneurship', desc: 'Start and grow your own business.' },
];

export default function Training() {
  return (
    <>
      <Helmet>
        <title>Training Academy - Professional Development | KaziLink</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Training Academy</span>
              <h1 className="heading-xl mt-2">Build Your Skills</h1>
              <p className="text-lg text-ink/60 mt-4">
                Advance your career with our professional development programs designed 
                to build in-demand skills.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="card p-6 card-hover">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <course.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mt-4 mb-2">{course.title}</h3>
                  <p className="text-ink/60 leading-relaxed">{course.desc}</p>
                  <button className="mt-4 text-primary-500 font-medium hover:text-primary-600 transition-colors">
                    Learn More →
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 card p-8 bg-primary-50 border-primary-200">
              <div className="text-center">
                <h2 className="heading-md mb-4">Ready to Start Learning?</h2>
                <p className="text-ink/60 max-w-2xl mx-auto mb-6">
                  Join our training programs and take the next step in your career development.
                </p>
                <button className="btn-primary">
                  Browse All Courses
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}