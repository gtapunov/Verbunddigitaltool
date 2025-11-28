import { OptionOneLayout } from './components/OptionOneLayout';

// ИСПРАВЛЕНО: Теперь мы импортируем файл по нормальному пути
import verbundLogo from './assets/logo.png';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#00468E] border-b border-[#003770]">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={verbundLogo} alt="VERBUND Logo" className="h-8" />
            <div>
              <h1 className="text-white">VERBUND Digital Technology Tool</h1>
              <p className="text-white/80 text-sm mt-1">Low-Fidelity Wireframe Mockup</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <OptionOneLayout />
      </main>
    </div>
  );
}
