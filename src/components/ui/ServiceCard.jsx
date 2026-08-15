import { Shield, Users, TrendingUp, Award, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';

const iconMap = {
  Shield,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  BookOpen,
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon] || Shield;

  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-paper-dim hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 mb-4">
          <IconComponent size={28} />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-ink/60 leading-relaxed">{service.description}</p>
        
        <div className="mt-4 flex items-center text-primary-500 font-medium text-sm group-hover:gap-2 transition-all">
          Learn More 
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}