import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  show: boolean;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  show,
  title,
  description,
  type = 'info',
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full px-4 animate-slide-up pointer-events-auto">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 ${
          isSuccess
            ? 'bg-emerald-950/95 text-emerald-100 border-emerald-500/50 shadow-emerald-950/50'
            : isError
            ? 'bg-rose-950/95 text-rose-100 border-rose-500/50 shadow-rose-950/50'
            : 'bg-slate-900/95 text-slate-100 border-slate-700/60 shadow-slate-950/50'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}

        <div className="flex-1 text-xs sm:text-sm">
          <h4 className="font-bold">{title}</h4>
          {description && (
            <p className="mt-0.5 text-slate-300 text-xs leading-relaxed">{description}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

