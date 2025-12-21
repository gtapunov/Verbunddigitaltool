import { useState, useMemo, useRef } from 'react';
import { TechnologyCard } from './TechnologyCard';
import { Droplet, Sun, Battery, Wind, Info } from 'lucide-react';

type Technology = {
  name: string;
  genType: 'hydro' | 'solar' | 'wind' | 'storage';
  disruptiveness: 'optimising' | 'innovative';
  itLayer: string;
  appArea: string;
  priority: 1 | 2 | 3 | 4;
};

const technologies: Technology[] = [
  {
    name: 'AI-based Hydrological Inflow Forecasting',
    genType: 'hydro',
    disruptiveness: 'innovative',
    itLayer: 'Application',
    appArea: 'Generation Forecasting',
    priority: 1,
  },
  {
    name: 'Digital Twin for Turbines & Generators',
    genType: 'hydro',
    disruptiveness: 'innovative',
    itLayer: 'Application',
    appArea: 'Asset Condition Monitoring',
    priority: 2,
  },
  {
    name: 'Acoustic Emissions Monitoring',
    genType: 'hydro',
    disruptiveness: 'optimising',
    itLayer: 'Infrastructure',
    appArea: 'Predictive Maintenance',
    priority: 1,
  },
  {
    name: 'AUVs & ROVs for Turbine Inspection',
    genType: 'hydro',
    disruptiveness: 'innovative',
    itLayer: 'Infrastructure',
    appArea: 'Asset Condition Monitoring',
    priority: 3,
  },
  {
    name: 'AI-Powered Hybrid PV+Storage Assets',
    genType: 'solar',
    disruptiveness: 'innovative',
    itLayer: 'Application',
    appArea: 'Dispatch & Scheduling',
    priority: 2,
  },
  {
    name: 'Autonomous Solar O&M',
    genType: 'solar',
    disruptiveness: 'innovative',
    itLayer: 'Infrastructure',
    appArea: 'Predictive Maintenance',
    priority: 3,
  },
  {
    name: 'Grid-Forming Inverters (GFM)',
    genType: 'storage',
    disruptiveness: 'innovative',
    itLayer: 'Compute',
    appArea: 'Dispatch & Scheduling',
    priority: 1,
  },
  {
    name: 'Fleet-wide Digital Twins / Virtual Wind Farms',
    genType: 'wind',
    disruptiveness: 'innovative',
    itLayer: 'Application',
    appArea: 'Operational Intelligence',
    priority: 2,
  },
  {
    name: 'AI-Powered Predictive Forecasting & Generation Control',
    genType: 'wind',
    disruptiveness: 'innovative',
    itLayer: 'Application',
    appArea: 'Generation Forecasting',
    priority: 1,
  },
  {
    name: 'Edge Computing + IoT Real-Time Monitoring',
    genType: 'wind',
    disruptiveness: 'innovative',
    itLayer: 'Compute',
    appArea: 'Predictive Maintenance',
    priority: 3,
  },
  {
    name: 'Virtual Power Plant (VPP) Aggregation Platforms',
    genType: 'wind',
    disruptiveness: 'innovative',
    itLayer: 'Application',
    appArea: 'Process Optimisation',
    priority: 4,
  },
];

const ALL_IT_LAYERS = ['Infrastructure', 'Compute', 'Application'];
const ALL_APPLICATION_AREAS = [
  'Operational Intelligence',
  'Process Optimisation',
  'Predictive Maintenance',
  'Asset Condition Monitoring',
  'Generation Forecasting',
  'Dispatch & Scheduling',
];
const ALL_DISRUPTIVENESS = ['optimising', 'innovative'] as const;
const ALL_GEN_TYPES = ['hydro', 'wind', 'solar', 'storage'] as const;

export function OptionOneLayout() {
  const [showCard, setShowCard] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [showScoreTooltip, setShowScoreTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const infoIconRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [itLayersFilter, setItLayersFilter] = useState<string[]>([]);
  const [disruptFilter, setDisruptFilter] = useState<string[]>([]);
  const [appAreasFilter, setAppAreasFilter] = useState<string[]>([]);
  const [genTypesFilter, setGenTypesFilter] = useState<string[]>([]);
  const [portfolioFilter, setPortfolioFilter] = useState<string[]>(['not-assigned']);
  const [scoreFilter, setScoreFilter] = useState<string[]>([]);

  // Check if "All" is active
  const isAllItLayers = itLayersFilter.length === 0;
  const isAllDisrupt = disruptFilter.length === 0;
  const isAllAppAreas = appAreasFilter.length === 0;
  const isAllGenTypes = genTypesFilter.length === 0;
  const isNotAssignedPortfolio = portfolioFilter.includes('not-assigned');
  const isAllScore = scoreFilter.length === 0;

  // Toggle handlers
  const toggleItLayer = (layer: string) => {
    setItLayersFilter((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  };

  const toggleAllItLayers = () => {
    setItLayersFilter([]);
  };

  const toggleDisrupt = (type: string) => {
    setDisruptFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAllDisrupt = () => {
    setDisruptFilter([]);
  };

  const toggleAppArea = (area: string) => {
    setAppAreasFilter((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const toggleAllAppAreas = () => {
    setAppAreasFilter([]);
  };

  const toggleGenType = (type: string) => {
    setGenTypesFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAllGenTypes = () => {
    setGenTypesFilter([]);
  };

  const togglePortfolio = (status: string) => {
    if (status === 'not-assigned') {
      setPortfolioFilter(['not-assigned']);
    } else {
      setPortfolioFilter((prev) => {
        const newFilter = prev.filter((s) => s !== 'not-assigned');
        if (newFilter.includes(status)) {
          const filtered = newFilter.filter((s) => s !== status);
          return filtered.length === 0 ? ['not-assigned'] : filtered;
        } else {
          return [...newFilter, status];
        }
      });
    }
  };

  const toggleAllPortfolio = () => {
    setPortfolioFilter(['not-assigned']);
  };

  const toggleScore = (score: string) => {
    setScoreFilter((prev) =>
      prev.includes(score) ? prev.filter((s) => s !== score) : [...prev, score]
    );
  };

  const toggleAllScore = () => {
    setScoreFilter([]);
  };

  // Filtered data
  const filteredTechnologies = useMemo(() => {
    return technologies.filter((tech) => {
      const layerMatch = isAllItLayers || itLayersFilter.includes(tech.itLayer);
      const disruptMatch = isAllDisrupt || disruptFilter.includes(tech.disruptiveness);
      const appAreaMatch = isAllAppAreas || appAreasFilter.includes(tech.appArea);
      const genTypeMatch = isAllGenTypes || genTypesFilter.includes(tech.genType);
      // Portfolio filter - if tech doesn't have portfolioStatus property, it passes through when "Not Assigned" is selected
      const portfolioMatch = isNotAssignedPortfolio || (tech as any).portfolioStatus === undefined || portfolioFilter.includes((tech as any).portfolioStatus);
      
      // Score filter - map score ranges to priority levels
      const scoreMatch = isAllScore || scoreFilter.some(score => {
        if (score === 'priority-1') return tech.priority === 1;
        if (score === 'priority-2') return tech.priority === 2;
        if (score === 'priority-3') return tech.priority === 3;
        if (score === 'not-recommended') return tech.priority === 4;
        return false;
      });

      return layerMatch && disruptMatch && appAreaMatch && genTypeMatch && portfolioMatch && scoreMatch;
    });
  }, [itLayersFilter, disruptFilter, appAreasFilter, genTypesFilter, portfolioFilter, scoreFilter, isAllItLayers, isAllDisrupt, isAllAppAreas, isAllGenTypes, isNotAssignedPortfolio, isAllScore]);

  // Visible rows and columns
  const visibleLayers = useMemo(() => {
    if (isAllItLayers) return ALL_IT_LAYERS;
    return ALL_IT_LAYERS.filter((layer) => itLayersFilter.includes(layer));
  }, [itLayersFilter, isAllItLayers]);

  const visibleAppAreas = useMemo(() => {
    if (isAllAppAreas) return ALL_APPLICATION_AREAS;
    return ALL_APPLICATION_AREAS.filter((area) => appAreasFilter.includes(area));
  }, [appAreasFilter, isAllAppAreas]);

  // Active generation types and disruptiveness (for legend)
  const activeGenTypes = useMemo(() => {
    if (isAllGenTypes) return ALL_GEN_TYPES;
    return ALL_GEN_TYPES.filter((type) => genTypesFilter.includes(type));
  }, [genTypesFilter, isAllGenTypes]);

  const activeDisruptTypes = useMemo(() => {
    if (isAllDisrupt) return ALL_DISRUPTIVENESS;
    return ALL_DISRUPTIVENESS.filter((type) => disruptFilter.includes(type));
  }, [disruptFilter, isAllDisrupt]);

  const getGenerationTypeColor = (genType: 'hydro' | 'solar' | 'wind' | 'storage') => {
    switch (genType) {
      case 'hydro':
        return 'bg-blue-100 border-blue-300';
      case 'solar':
        return 'bg-yellow-100 border-yellow-300';
      case 'wind':
        return 'bg-slate-200 border-slate-400';
      case 'storage':
        return 'bg-purple-100 border-purple-300';
    }
  };

  const getTechnologiesForCell = (layer: string, area: string) => {
    return filteredTechnologies.filter((tech) => tech.itLayer === layer && tech.appArea === area);
  };

  const getPriorityIcon = (priority: 1 | 2 | 3 | 4) => {
    switch (priority) {
      case 1:
        return {
          bg: '#D64545',
          text: '!!!',
        };
      case 2:
        return {
          bg: '#E87F3A',
          text: '!!',
        };
      case 3:
        return {
          bg: '#4AAE68',
          text: '!',
        };
      case 4:
        return {
          bg: '#6B7280',
          text: '–',
        };
    }
  };

  return (
    <div className="flex h-[calc(100vh-88px)]">
      {/* Left Panel - Filters */}
      <aside className="w-64 bg-white border-r border-slate-300 p-5 overflow-y-auto">
        <h2 className="text-slate-900 mb-5">Filters</h2>
        
        {/* Filter Section 1 - IT Architecture Layer */}
        <div className="mb-5">
          <h3 className="text-slate-700 mb-3 text-sm">Filter by IT Architecture Layer</h3>
          <div className="space-y-2">
            <button
              onClick={toggleAllItLayers}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                isAllItLayers ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {isAllItLayers && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${isAllItLayers ? 'text-slate-900' : 'text-slate-600'}`}>
                All
              </span>
            </button>
            {ALL_IT_LAYERS.map((layer) => (
              <button
                key={layer}
                onClick={() => toggleItLayer(layer)}
                className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
              >
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                  itLayersFilter.includes(layer) ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
                }`}>
                  {itLayersFilter.includes(layer) && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                </div>
                <span className={`text-sm ${itLayersFilter.includes(layer) ? 'text-slate-900' : 'text-slate-600'}`}>
                  {layer}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 my-4"></div>

        {/* Filter Section 2 - Disruptiveness */}
        <div className="mb-5">
          <h3 className="text-slate-700 mb-3 text-sm">Filter by Disruptiveness</h3>
          <div className="space-y-2">
            <button
              onClick={toggleAllDisrupt}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                isAllDisrupt ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {isAllDisrupt && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${isAllDisrupt ? 'text-slate-900' : 'text-slate-600'}`}>
                All
              </span>
            </button>
            <button
              onClick={() => toggleDisrupt('optimising')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                disruptFilter.includes('optimising') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {disruptFilter.includes('optimising') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${disruptFilter.includes('optimising') ? 'text-slate-900' : 'text-slate-600'}`}>
                Optimising
              </span>
            </button>
            <button
              onClick={() => toggleDisrupt('innovative')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                disruptFilter.includes('innovative') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {disruptFilter.includes('innovative') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${disruptFilter.includes('innovative') ? 'text-slate-900' : 'text-slate-600'}`}>
                Innovative
              </span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 my-4"></div>

        {/* Filter Section 3 - Application Area */}
        <div className="mb-5">
          <h3 className="text-slate-700 mb-3 text-sm">Filter by Application Area</h3>
          <div className="space-y-2">
            <button
              onClick={toggleAllAppAreas}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                isAllAppAreas ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {isAllAppAreas && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${isAllAppAreas ? 'text-slate-900' : 'text-slate-600'}`}>
                All
              </span>
            </button>
            {ALL_APPLICATION_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => toggleAppArea(area)}
                className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
              >
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                  appAreasFilter.includes(area) ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
                }`}>
                  {appAreasFilter.includes(area) && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                </div>
                <span className={`text-sm ${appAreasFilter.includes(area) ? 'text-slate-900' : 'text-slate-600'}`}>
                  {area}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 my-4"></div>

        {/* Filter Section 4 - Power Generation Type */}
        <div className="mb-5">
          <h3 className="text-slate-700 mb-3 text-sm">Filter by Power Generation Type</h3>
          <div className="space-y-2">
            <button
              onClick={toggleAllGenTypes}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                isAllGenTypes ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {isAllGenTypes && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${isAllGenTypes ? 'text-slate-900' : 'text-slate-600'}`}>
                All
              </span>
            </button>
            <button
              onClick={() => toggleGenType('hydro')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                genTypesFilter.includes('hydro') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {genTypesFilter.includes('hydro') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${genTypesFilter.includes('hydro') ? 'text-slate-900' : 'text-slate-600'}`}>
                Hydro
              </span>
            </button>
            <button
              onClick={() => toggleGenType('wind')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                genTypesFilter.includes('wind') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {genTypesFilter.includes('wind') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${genTypesFilter.includes('wind') ? 'text-slate-900' : 'text-slate-600'}`}>
                Wind
              </span>
            </button>
            <button
              onClick={() => toggleGenType('solar')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                genTypesFilter.includes('solar') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {genTypesFilter.includes('solar') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${genTypesFilter.includes('solar') ? 'text-slate-900' : 'text-slate-600'}`}>
                PV
              </span>
            </button>
            <button
              onClick={() => toggleGenType('storage')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                genTypesFilter.includes('storage') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {genTypesFilter.includes('storage') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${genTypesFilter.includes('storage') ? 'text-slate-900' : 'text-slate-600'}`}>
                Storage
              </span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 my-4"></div>

        {/* Filter Section 5 - VERBUND Adoption Status */}
        <div className="mb-5">
          <h3 className="text-slate-700 mb-3 text-sm">VERBUND Adoption Status</h3>
          <div className="space-y-2">
            <button
              onClick={toggleAllPortfolio}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                isNotAssignedPortfolio ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {isNotAssignedPortfolio && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm text-left ${isNotAssignedPortfolio ? 'text-slate-900' : 'text-slate-600'}`}>
                Not Assigned
              </span>
            </button>
            <button
              onClick={() => togglePortfolio('applied')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                portfolioFilter.includes('applied') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {portfolioFilter.includes('applied') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm text-left ${portfolioFilter.includes('applied') ? 'text-slate-900' : 'text-slate-600'}`}>
                Already Applied by VERBUND
              </span>
            </button>
            <button
              onClick={() => togglePortfolio('in-plan')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                portfolioFilter.includes('in-plan') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {portfolioFilter.includes('in-plan') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm text-left ${portfolioFilter.includes('in-plan') ? 'text-slate-900' : 'text-slate-600'}`}>
                In Plan
              </span>
            </button>
            <button
              onClick={() => togglePortfolio('outlook')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                portfolioFilter.includes('outlook') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {portfolioFilter.includes('outlook') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm text-left ${portfolioFilter.includes('outlook') ? 'text-slate-900' : 'text-slate-600'}`}>
                Outlook
              </span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 my-4"></div>

        {/* Filter Section 6 - Technology Overall Score */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-3">
            <h3 className="text-slate-700 text-sm">Technology Overall Score</h3>
            <div
              ref={infoIconRef}
              onMouseEnter={() => {
                const rect = infoIconRef.current?.getBoundingClientRect();
                if (rect) {
                  setTooltipPosition({ x: rect.right + 8, y: rect.top });
                }
                setShowScoreTooltip(true);
              }}
              onMouseLeave={() => setShowScoreTooltip(false)}
              className="cursor-help"
            >
              <Info className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>
          <div className="space-y-2">
            <button
              onClick={toggleAllScore}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                isAllScore ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {isAllScore && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${isAllScore ? 'text-slate-900' : 'text-slate-600'}`}>
                All
              </span>
            </button>
            <button
              onClick={() => toggleScore('priority-1')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                scoreFilter.includes('priority-1') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {scoreFilter.includes('priority-1') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${scoreFilter.includes('priority-1') ? 'text-slate-900' : 'text-slate-600'}`}>
                10.0 &ndash; 8.0 (Priority 1)
              </span>
            </button>
            <button
              onClick={() => toggleScore('priority-2')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                scoreFilter.includes('priority-2') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {scoreFilter.includes('priority-2') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${scoreFilter.includes('priority-2') ? 'text-slate-900' : 'text-slate-600'}`}>
                7.9 &ndash; 6.0 (Priority 2)
              </span>
            </button>
            <button
              onClick={() => toggleScore('priority-3')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                scoreFilter.includes('priority-3') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {scoreFilter.includes('priority-3') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${scoreFilter.includes('priority-3') ? 'text-slate-900' : 'text-slate-600'}`}>
                5.9 &ndash; 4.0 (Priority 3)
              </span>
            </button>
            <button
              onClick={() => toggleScore('not-recommended')}
              className="flex items-center gap-2 w-full hover:bg-slate-50 py-1 -mx-1 px-1 rounded transition-colors"
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                scoreFilter.includes('not-recommended') ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
              }`}>
                {scoreFilter.includes('not-recommended') && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className={`text-sm ${scoreFilter.includes('not-recommended') ? 'text-slate-900' : 'text-slate-600'}`}>
                &lt; 4.0 (Not recommended)
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Canvas - Technology Map */}
      <main className="flex-1 p-6 overflow-auto bg-slate-50">
        <div className="mb-6">
          <h2 className="text-slate-900 mb-1">Technology Map</h2>
        </div>

        {/* Technology Grid */}
        <div className="border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
          {/* Header Row */}
          <div className="grid" style={{ gridTemplateColumns: `120px repeat(${visibleAppAreas.length}, 1fr)` }}>
            {/* Top-left header cell */}
            <div className="p-3 border-r border-slate-200 bg-[#00468E] flex items-center justify-center">
              <span className="text-white text-sm font-bold">IT Layer</span>
            </div>
            {visibleAppAreas.map((area, idx) => (
              <div key={idx} className="p-3 border-r border-slate-200 last:border-r-0 bg-white">
                <span className="text-slate-700 text-sm font-bold">{area}</span>
              </div>
            ))}
          </div>

          {/* Orange divider line */}
          <div className="w-full h-[3px] bg-[#E87F3A]"></div>

          {/* Grid Rows */}
          {visibleLayers.map((layer, rowIdx) => (
            <div key={rowIdx} className="grid border-b border-slate-200 last:border-b-0" style={{ gridTemplateColumns: `120px repeat(${visibleAppAreas.length}, 1fr)` }}>
              {/* Row label with dark blue background */}
              <div className="p-3 border-r border-slate-200 bg-[#00468E] flex items-center justify-center">
                <span className="text-white text-sm">{layer}</span>
              </div>
              {visibleAppAreas.map((area, colIdx) => {
                const cellTechs = getTechnologiesForCell(layer, area);
                return (
                  <div
                    key={colIdx}
                    className="p-2 border-r border-slate-200 last:border-r-0 min-h-[100px] bg-white"
                  >
                    {cellTechs.map((tech, techIdx) => {
                      const priorityIcon = getPriorityIcon(tech.priority);
                      return (
                        <button
                          key={techIdx}
                          onClick={() => {
                            setSelectedTech(tech.name);
                            setShowCard(true);
                          }}
                          className={`w-full mb-2 last:mb-0 h-auto min-h-[80px] rounded border-2 p-2 relative transition-all hover:shadow-md hover:border-slate-500 ${getGenerationTypeColor(
                            tech.genType
                          )}`}
                        >
                          {/* Priority Icon */}
                          <div
                            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] leading-none"
                            style={{ backgroundColor: priorityIcon.bg }}
                          >
                            {priorityIcon.text}
                          </div>

                          {/* Technology Name */}
                          <div className="text-slate-800 text-xs text-left pr-7">
                            {tech.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 border border-slate-300 rounded-lg bg-white inline-block">
          <div className="space-y-4">
            {/* Generation Type Legend */}
            <div>
              <h3 className="text-slate-700 text-sm mb-3">Generation Type</h3>
              <div className="flex gap-4 flex-wrap">
                {activeGenTypes.includes('hydro') && (
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-8 bg-blue-100 border-2 border-blue-300 rounded flex items-center justify-center">
                      <Droplet className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-slate-600 text-sm">Hydro</span>
                  </div>
                )}
                {activeGenTypes.includes('wind') && (
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-8 bg-slate-200 border-2 border-slate-400 rounded flex items-center justify-center">
                      <Wind className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="text-slate-600 text-sm">Wind</span>
                  </div>
                )}
                {activeGenTypes.includes('solar') && (
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-8 bg-yellow-100 border-2 border-yellow-300 rounded flex items-center justify-center">
                      <Sun className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-slate-600 text-sm">Solar</span>
                  </div>
                )}
                {activeGenTypes.includes('storage') && (
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-8 bg-purple-100 border-2 border-purple-300 rounded flex items-center justify-center">
                      <Battery className="w-4 h-4 text-purple-500" />
                    </div>
                    <span className="text-slate-600 text-sm">Storage</span>
                  </div>
                )}
              </div>
            </div>

            {/* Priority Legend */}
            <div>
              <h3 className="text-slate-700 text-sm mb-3">Priority</h3>
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] leading-none"
                    style={{ backgroundColor: '#D64545' }}
                  >
                    !!!
                  </div>
                  <span className="text-slate-600 text-sm">Priority 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] leading-none"
                    style={{ backgroundColor: '#E87F3A' }}
                  >
                    !!
                  </div>
                  <span className="text-slate-600 text-sm">Priority 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] leading-none"
                    style={{ backgroundColor: '#4AAE68' }}
                  >
                    !
                  </div>
                  <span className="text-slate-600 text-sm">Priority 3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] leading-none"
                    style={{ backgroundColor: '#6B7280' }}
                  >
                    –
                  </div>
                  <span className="text-slate-600 text-sm">Priority 4 (Not recommended)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Technology Card Modal */}
      {showCard && <TechnologyCard techName={selectedTech} onClose={() => setShowCard(false)} />}

      {/* Technology Overall Score Tooltip - Fixed Position Overlay */}
      {showScoreTooltip && (
        <div
          className="fixed w-64 bg-white text-slate-900 text-xs p-3 rounded-lg border border-slate-300 shadow-lg pointer-events-none"
          style={{ 
            left: `${tooltipPosition.x}px`, 
            top: `${tooltipPosition.y}px`,
            zIndex: 99999
          }}
        >
          <p className="mb-2">
            <strong>Technology Overall Score</strong> is a weighted score that evaluates technologies based on 3 pillars: strategic fit, feasibility, and implementation.
          </p>
          <p className="mb-2">
            <strong>Formula:</strong>
          </p>
          <p className="mb-2">
            Total Score = Σ (Normalized Criterion Score × Criterion Weight)
          </p>
          <p>
            See details by clicking on one of the technologies.
          </p>
        </div>
      )}
    </div>
  );
}