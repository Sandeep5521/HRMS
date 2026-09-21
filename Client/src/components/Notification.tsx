import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Placement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface NotificationProps {
  message: string;
  duration?: number;
  show: boolean;
  onClose: () => void;
  placement?: Placement;
  type?: "success" | "error" | "info" | "warning";
}

const positions: Record<Placement, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

const variants = {
  success: {
    border: "border-green-500",
    progress: "bg-green-500",
  },
  error: {
    border: "border-red-500",
    progress: "bg-red-500",
  },
  info: {
    border: "border-blue-500",
    progress: "bg-blue-500",
  },
  warning: {
    border: "border-yellow-500",
    progress: "bg-yellow-500",
  },
};

export default function Notification({
  message,
  duration = 5000,
  show,
  onClose,
  placement = "top-right",
  type = "info",
}: NotificationProps) {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    if (!show) return;

    setWidth(100);

    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(
        0,
        100 - (elapsed / duration) * 100
      );

      setWidth(remaining);

      if (elapsed >= duration) {
        clearInterval(interval);
        onClose();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [show, duration, onClose]);

  if (!show) return null;

  return createPortal(
    <div
      className={`
        fixed z-9999
        ${positions[placement]}
        w-[90vw] max-w-sm
        animate-in slide-in-from-top-3 fade-in
      `}
    >
      <div
        className={`
          overflow-hidden rounded-xl
          bg-white shadow-xl
          border-l-4 ${variants[type].border}
        `}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm text-gray-800">{message}</p>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="h-1 bg-gray-200">
          <div
            className={`h-full transition-all duration-75 ${variants[type].progress}`}
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}