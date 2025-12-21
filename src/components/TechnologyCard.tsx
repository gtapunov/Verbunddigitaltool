import { X } from 'lucide-react';

interface TechnologyCardProps {
  techName?: string;
  onClose: () => void;
}

export function TechnologyCard({ techName, onClose }: TechnologyCardProps) {
  const isAcousticEmissions = techName === 'Acoustic Emissions Monitoring';

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
            {isAcousticEmissions ? (
              <div className="border border-slate-200 rounded bg-slate-50 p-4">
                <p className="text-slate-600">
                  Imagine if VERBUND's turbines could tell us when they're about to fail 6 months in advance—before catastrophic breakdown.
                </p>
                <p className="text-slate-600 mt-3">
                  <strong>How it works:</strong><br />
                  Tiny sensors (microphones) listen to the acoustic 'fingerprint' of turbines.<br />
                  AI analyzes vibration patterns and noise.<br />
                  When patterns change, AI predicts: "Bearing will fail in 120 days — schedule maintenance for day 100."
                </p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded bg-slate-50 p-4 min-h-24"></div>
            )}
          </div>

          {/* Why it matters section */}
          <div>
            <h3 className="text-slate-700 mb-3">Why it matters for VERBUND</h3>
            {isAcousticEmissions ? (
              <div className="border border-slate-200 rounded bg-slate-50 p-4">
                <p className="text-slate-600">
                  <strong>Challenge:</strong><br />
                  VERBUND's 132 hydropower plants + 342 wind turbines are aging assets.<br />
                  Extended lifespan = extended profitability.
                </p>
                <p className="text-slate-600 mt-3">
                  <strong>Opportunity:</strong><br />
                  30–50% downtime reduction, 15–25% equipment lifespan extension, €3–5M/year savings.
                </p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded bg-slate-50 p-4 min-h-24"></div>
            )}
          </div>

          {/* Application Area section */}
          <div>
            <h3 className="text-slate-700 mb-3">Application Area</h3>
            {isAcousticEmissions ? (
              <div className="border border-slate-200 rounded bg-slate-50 p-4">
                <p className="text-slate-600">Predictive Maintenance</p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded bg-slate-50 p-4 h-16"></div>
            )}
          </div>

          {/* Use Cases section */}
          <div>
            <h3 className="text-slate-700 mb-3">Use Cases</h3>
            {isAcousticEmissions ? (
              <div className="space-y-2">
                <div className="border border-slate-200 rounded bg-slate-50 p-4">
                  <a href="https://example.com/axpo-hydro" className="text-blue-600 hover:underline">
                    Axpo Hydro 4.0 — https://example.com/axpo-hydro
                  </a>
                </div>
                <div className="border border-slate-200 rounded bg-slate-50 p-4">
                  <a href="https://example.com/mtr-labs" className="text-blue-600 hover:underline">
                    MTR Labs — https://example.com/mtr-labs
                  </a>
                </div>
                <div className="border border-slate-200 rounded bg-slate-50 p-4">
                  <a href="https://example.com/acoustic-ai" className="text-blue-600 hover:underline">
                    Acoustic Analytics Pilot — https://example.com/acoustic-ai
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="border border-slate-200 rounded bg-slate-50 p-4 h-16"></div>
                <div className="border border-slate-200 rounded bg-slate-50 p-4 h-16"></div>
                <div className="border border-slate-200 rounded bg-slate-50 p-4 h-16"></div>
              </div>
            )}
          </div>

          {/* Key Assessment Points - Only for Acoustic Emissions */}
          {isAcousticEmissions && (
            <div>
              <h3 className="text-slate-700 mb-3">Key Assessment Points</h3>
              
              {/* Assessment Table */}
              <div className="border border-slate-300 rounded overflow-hidden mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300">
                      <th className="text-left p-3 text-slate-700">Criterion</th>
                      <th className="text-left p-3 text-slate-700">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-slate-200">
                      <td className="p-3 text-slate-600">Strategic Relevance</td>
                      <td className="p-3 text-slate-600">Prevents catastrophic failures; critical for Mission V</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-3 text-slate-600">Practical Adoption</td>
                      <td className="p-3 text-slate-600">Axpo Hydro 4.0 operational; MTR Lab deployed in multiple plants</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-3 text-slate-600">Business Impact</td>
                      <td className="p-3 text-slate-600">30–50% downtime reduction; €3–5M/year cost savings</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-3 text-slate-600">Scalability</td>
                      <td className="p-3 text-slate-600">Acoustic sensors standardized; highly transferable</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-3 text-slate-600">Financial Outlook</td>
                      <td className="p-3 text-slate-600">FASTEST payback: 12–18 months</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-3 text-slate-600">Digital Sovereignty</td>
                      <td className="p-3 text-slate-600">Operates locally; minimal cloud dependency</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-600">Disruptiveness</td>
                      <td className="p-3 text-slate-600">Detects anomalies competitors cannot see</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Overall Score Card */}
              <div className="border-2 border-blue-300 rounded bg-blue-50 p-4 mb-3">
                <p className="text-slate-800">
                  <strong>OVERALL SCORE: 7.9/10 → PRIORITY 1 (HIGH ROI WINNER)</strong>
                </p>
              </div>

              {/* Summary */}
              <div className="border border-slate-200 rounded bg-slate-50 p-4">
                <p className="text-slate-600">
                  Why Select? Highest ROI (12–18 month payback). High digital sovereignty. Expandable to wind. Prevents €50M+ losses. Quick pilot (3–6 months).
                </p>
              </div>
            </div>
          )}

          {/* Business Impact section - Only for non-Acoustic Emissions */}
          {!isAcousticEmissions && (
            <div>
              <h3 className="text-slate-700 mb-3">Business Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded bg-slate-50 p-4 h-20"></div>
                <div className="border border-slate-200 rounded bg-slate-50 p-4 h-20"></div>
                <div className="border border-slate-200 rounded bg-slate-50 p-4 h-20"></div>
                <div className="border border-slate-200 rounded bg-slate-50 p-4 h-20"></div>
              </div>
            </div>
          )}

          {/* Required Data section - Only for non-Acoustic Emissions */}
          {!isAcousticEmissions && (
            <div>
              <h3 className="text-slate-700 mb-3">Required Data</h3>
              <div className="border border-slate-200 rounded bg-slate-50 p-4 min-h-24"></div>
            </div>
          )}
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