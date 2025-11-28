import { OptionOneLayout } from './components/OptionOneLayout';

// Ваша ссылка на SVG
const verbundLogo = "https://upload.wikimedia.org/wikipedia/commons/9/9c/Verbund.svg";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#00468E] border-b border-[#003770]">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            
            {/* Белая подложка (bg-white), чтобы синий логотип был виден на синем фоне */}
            <div className="bg-white px-2 py-1 rounded flex items-center justify-center h-8">
                <img 
                  src={verbundLogo} 
                  alt="VERBUND Logo" 
                  className="h-full w-auto"
                  // ЭТА СТРОКА ОЧЕНЬ ВАЖНА, ЧТОБЫ КАРТИНКА НЕ БЛОКИРОВАЛАСЬ:
                  referrerPolicy="no-referrer"
                />
            </div>

            <div>
              <h1 className="text-white font-semibold leading-tight">Digital Technology Tool</h1>
              <p className="text-white/80 text-xs">Low-Fidelity Wireframe Mockup</p>
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
