import React, { useEffect } from 'react';
import { TerminalComponent } from './TerminalComponent';

interface FloatingTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenResume?: () => void;
}

export const FloatingTerminalModal: React.FC<FloatingTerminalModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenResume,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080B10]/80 backdrop-blur-md animate-in fade-in duration-150 lg:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl h-[560px] shadow-2xl bottom-sheet lg:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <TerminalComponent
          onNavigateSection={(sec) => {
            onNavigateSection(sec);
            onClose();
          }}
          onOpenResume={() => {
            if (onOpenResume) {
              onClose();
              onOpenResume();
            }
          }}
          isStandalone={true}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
