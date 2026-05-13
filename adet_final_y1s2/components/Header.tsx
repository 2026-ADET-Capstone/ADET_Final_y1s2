import Logo from './logo';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center">
        <Logo size={56} />
        <h1 className="flex-1 text-center text-2xl md:text-3xl font-light text-[#1a2a4a] tracking-[0.3em]">
          Moonlight Motion
        </h1>
        {/* Spacer to keep title visually centered against the logo on the left */}
        <div style={{ width: 56 }} aria-hidden="true" />
      </div>
    </header>
  );
}