export default function FloatingContactButton() {
  return (
    <a
      href="tel:0751306600"
      className="md:hidden fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-12 h-12 rounded-md bg-deep-purple text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
      style={{
        boxShadow: '0 4px 20px rgba(155,89,182,0.3), 0 0 40px rgba(155,89,182,0.1)',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    </a>
  );
}
