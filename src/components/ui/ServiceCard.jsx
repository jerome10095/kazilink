import { Shield, Users, TrendingUp, Award, CheckCircle, BookOpen, Wrench, Hammer, Paintbrush2, Sparkles, Cog, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const iconMap = {
  Shield,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  BookOpen,
  Wrench,
  Hammer,
  Paintbrush2,
  Sparkles,
  Cog,
  Zap,
};

export default function ServiceCard({ service }) {
  const { t, pick } = useLanguage();
  const IconComponent = iconMap[service.icon] || Shield;

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-primary-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-strong dark:border-primary-700/50 dark:bg-primary-800">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-primary-700/40 dark:to-primary-700/10" />

      <div className="relative">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 transition-all duration-300 group-hover:bg-primary-700 group-hover:text-white dark:bg-primary-700 dark:text-primary-100 dark:group-hover:bg-primary-400 dark:group-hover:text-primary-900">
          <IconComponent size={26} />
        </div>

        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-primary-800 dark:text-white">{pick(service.title, service.titleRw)}</h3>
          <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-700/60 dark:text-primary-100">
            {service.workers ?? 0} {t('services.workersSuffix')}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-primary-700/75 dark:text-primary-100/70">{pick(service.description, service.descriptionRw)}</p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-200">
          {t('common.learnMore')} <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
}
