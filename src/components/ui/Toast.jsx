import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const toastVariants = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 },
};

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: 'border-secondary-500 bg-secondary-50 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300',
  error: 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  warning: 'border-accent-500 bg-accent-50 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
  info: 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
};

function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  const Icon = icons[type] || Info;

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex items-start gap-3 rounded-2xl border p-4 shadow-strong ${colors[type]}`}
      role="alert"
    >
      <Icon size={20} className="mt-0.5 shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 text-current opacity-60 hover:opacity-100"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed right-4 top-20 z-50 w-full max-w-sm space-y-3 md:right-6 md:top-24">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

let toastId = 0;
let listeners = [];

function notify(toast) {
  listeners.forEach((listener) => listener(toast));
}

export function useToast() {
  const addToast = (message, type = 'info') => {
    const id = ++toastId;
    notify({ id, message, type });
    return id;
  };

  return { addToast };
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
