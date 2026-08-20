const whatsappNumber = '447773754138';
const whatsappMessage = encodeURIComponent(
  'Hello Webara Studio, I would like to discuss a website or web app project.'
);

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Webara Studio on WhatsApp"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-50 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-[#062b14] shadow-lg shadow-black/25 transition hover:bg-[#20bd5a] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 sm:right-6"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 fill-current"
      >
        <path d="M16.02 3.2c-7.06 0-12.8 5.73-12.8 12.8 0 2.26.59 4.38 1.62 6.22L3.1 28.8l6.78-1.71a12.75 12.75 0 0 0 6.14 1.57h.01c7.06 0 12.79-5.74 12.79-12.8S23.08 3.2 16.02 3.2Zm0 23.34h-.01a10.55 10.55 0 0 1-5.38-1.48l-.39-.23-4.02 1.02 1.07-3.92-.25-.4a10.58 10.58 0 1 1 8.98 5.01Zm5.8-7.93c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.33-.85 1.05-1.04 1.27-.19.22-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.33-.02-.5.14-.66.15-.15.32-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.51 5.58 4.92.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.14-.3-.22-.62-.38Z" />
      </svg>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
