import { X } from 'lucide-react';

interface TechnologyCardProps {
  techName?: string;
  onClose: () => void;
}

export function TechnologyCard({ techName, onClose }: TechnologyCardProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-slate-900">{techName || 'Technology Name'}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description Section */}
          <div>
            <h3 className="text-slate-700 mb-3">Description</h3>
            <div className="border border-slate-200 rounded bg-slate-50 p-4 min-h-24"></div>
          </div>

          {/* Why it matters section */}
          <div>
            <h3 className="text-slate-700 mb-3">Why it matters for VERBUND</h3>
            <div className="border border-slate-200 rounded bg-slate-50 p-4 min-h-24"></div>
          </div>

          {/* Application Area section */}
          <div>
            <h3 className="text-slate-700 mb-3">Application Area</h3>
            <div className="border border-slate-200 rounded bg-slate-50 p-4 h-16"></div>
          </div>

          {/* Use Cases section */}
          <div>
            <h3 className="text-slate-700 mb-3">Use Cases</h3>
            <div className="space-y-2">
              <div className="border border-slate-200 rounded bg-slate-50 p-4 h-16"></div>
              <div className="border border-slate-200 rounded bg-slate-50 p-4 h-16"></div>
              <div className="border border-slate-200 rounded bg-slate-50 p-4 h-16"></div>
            </div>
          </div>

          {/* Business Impact section */}
          <div>
            <h3 className="text-slate-700 mb-3">Business Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded bg-slate-50 p-4 h-20"></div>
              <div className="border border-slate-200 rounded bg-slate-50 p-4 h-20"></div>
              <div className="border border-slate-200 rounded bg-slate-50 p-4 h-20"></div>
              <div className="border border-slate-200 rounded bg-slate-50 p-4 h-20"></div>
            </div>
          </div>

          {/* Required Data section */}
          <div>
            <h3 className="text-slate-700 mb-3">Required Data</h3>
            <div className="border border-slate-200 rounded bg-slate-50 p-4 min-h-24"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}