// apps/viewerfeatures/Footer.tsx

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-sm text-neutral-500 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} 고운 수박 LIVE</p>
        <nav className="flex gap-4">
          <a href="/about" className="hover:text-neutral-700">소개</a>
          <a href="/policy" className="hover:text-neutral-700">이용약관</a>
          <a href="/privacy" className="hover:text-neutral-700">개인정보처리방침</a>
          <a href="/cs" className="hover:text-neutral-700">고객센터</a>
        </nav>
      </div>
    </footer>
  );
}
