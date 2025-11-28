import { OptionOneLayout } from './components/OptionOneLayout';

// ИСПОЛЬЗУЕМ PNG (это надежнее, чем SVG)
const verbundLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Verbund.svg/200px-Verbund.svg.png";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#00468E] border-b border-[#003770]">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Добавили белый фон (bg-white) и отступы (p-1), чтобы синий логотип был виден на синем хедере */}
            <div className="bg-white p-1 rounded flex items-center justify-center h-8 w-auto">
                <img 
                  src={verbundLogo} 
                  alt="VERBUND Logo" 
                  className="h-full w-auto object-contain" 
                  // Этот атрибут помогает, если Википедия блокирует чужие сайты
                  referrerPolicy="no-referrer"
                />
            </div>
            <div>
              <h1 className="text-white font-semibold">VERBUND Digital Technology Tool</h1>
              <p className="text-white/80 text-sm">Low-Fidelity Wireframe Mockup</p>
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
