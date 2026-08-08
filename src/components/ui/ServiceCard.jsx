import {
  Shield,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  BookOpen,
} from 'lucide-react';

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
    <div className="card p-6 card-hover group">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
        <IconComponent size={28} />
      </div>

      <h3 className="text-xl font-semibold mt-4 mb-2">
        {service.title}
      </h3>

      <p className="text-ink/60 leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}