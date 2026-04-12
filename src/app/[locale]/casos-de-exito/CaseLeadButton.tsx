'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import CaseLeadModal from './CaseLeadModal';

export default function CaseLeadButton({ caseId, caseName }: { caseId: string; caseName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm font-medium text-purple-400 hover:text-purple-300 hover:border-purple-500/20 hover:bg-purple-500/[0.04] transition-all duration-300 cursor-pointer"
      >
        <Lock className="w-3.5 h-3.5" />
        Ver caso completo
      </button>
      <CaseLeadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        caseId={caseId}
        caseName={caseName}
      />
    </>
  );
}
