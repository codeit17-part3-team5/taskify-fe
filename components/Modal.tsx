import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  contentClassName,
  overlayClassName,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // 바디 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 isolate">
      {' '}
      {/* 스타일 최소화 */}
      {/* 오버레이 (스타일 강요 X) */}
      <div
        className={`absolute inset-0 ${overlayClassName ?? 'bg-black/40'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* 중앙 배치만 담당. 크기/여백은 자식이 책임지도록 pointer-events 트릭 */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          className={`pointer-events-auto ${contentClassName ?? ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
