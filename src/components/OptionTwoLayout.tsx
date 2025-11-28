import { useState } from 'react';
import { TechnologyCard } from './TechnologyCard';
import { ChevronRight } from 'lucide-react';

type ViewState = 'valueChain' | 'generation' | 'technology';

export function OptionTwoLayout() {
  const [view, setView] = useState<ViewState>('valueChain');
  const [selectedGenType, setSelectedGenType] = useState<string>('');
  const [showCard, setShowCard] = useState(false);

  const valueChainStages = [
    'Generation',
    'Transmission',
    'Trading',
    'Distribution',
    'Customers',
  ];

  const generationTypes = ['Hydropower', 'Wind', 'PV'];

  return (
    <div className="p-6 min-h-[calc(100vh-88px)]">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
        <button
          onClick={() => setView('valueChain')}
          className="hover:text-slate-900"
        >
          Value Chain
        </button>
        {view !== 'valueChain' && (
          <>
            <ChevronRight className="w-4 h-4" />
            <button
              onClick={() => setView('generation')}
              className="hover:text-slate-900"
            >
              Generation
            </button>
          </>
        )}
        {selectedGenType && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{selectedGenType}</span>
          </>
        )}
      </div>

      {/* Value Chain View */}
      {view === 'valueChain' && (
        <div>
          <h2 className="text-slate-900 mb-6">VERBUND Value Chain</h2>
          <div className="flex gap-4">
            {valueChainStages.map((stage, idx) => (
              <div key={idx} className="flex-1">
                <button
                  onClick={() => {
                    if (stage === 'Generation') {
                      setView('generation');
                    }
                  }}
                  className={`w-full h-48 border-2 rounded-lg bg-white ${
                    stage === 'Generation'
                      ? 'border-blue-500 hover:border-blue-600 cursor-pointer'
                      : 'border-slate-300 cursor-default'
                  } flex items-center justify-center transition-colors`}
                >
                  <div className="text-center">
                    <div className="text-slate-900 mb-2">{stage}</div>
                    {stage === 'Generation' && (
                      <div className="text-sm text-blue-600">Click to explore →</div>
                    )}
                  </div>
                </button>
                {idx < valueChainStages.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <ChevronRight className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-slate-500">
            Click on "Generation" to zoom into detailed view
          </div>
        </div>
      )}

      {/* Generation Zoom View */}
      {view === 'generation' && (
        <div>
          <h2 className="text-slate-900 mb-6">Generation — Technology Overview</h2>
          <div className="grid grid-cols-3 gap-6">
            {generationTypes.map((type, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedGenType(type);
                  setView('technology');
                }}
                className="border-2 border-slate-300 rounded-lg bg-white p-6 hover:border-blue-500 transition-colors cursor-pointer"
              >
                <h3 className="text-slate-900 mb-4">{type}</h3>
                <div className="space-y-3">
                  <div className="h-20 bg-slate-100 border border-slate-200 rounded"></div>
                  <div className="h-20 bg-slate-100 border border-slate-200 rounded"></div>
                  <div className="h-20 bg-slate-100 border border-slate-200 rounded"></div>
                </div>
                <div className="mt-4 text-sm text-blue-600">
                  View technology bundles →
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Technology Bundle View */}
      {view === 'technology' && selectedGenType && (
        <div>
          <h2 className="text-slate-900 mb-6">{selectedGenType} — Technology Bundles</h2>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setShowCard(true)}
                className="border border-slate-300 rounded-lg bg-white p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="h-24 bg-gradient-to-br from-blue-50 to-slate-50 border border-slate-200 rounded mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-100 rounded w-full"></div>
              </button>
            ))}
          </div>
          <div className="mt-6 text-sm text-slate-500">
            Click any technology card to view details
          </div>
        </div>
      )}

      {/* Technology Card Modal */}
      {showCard && <TechnologyCard onClose={() => setShowCard(false)} />}
    </div>
  );
}
