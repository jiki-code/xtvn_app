export default function UnsupportedDevice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-900 dark:to-slate-950 px-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 max-w-md w-full text-center transition-all duration-300 animate-fadeIn">
        
        {/* ICON */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-blue-600/10 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01M9.172 16.828a4 4 0 015.656 0M4.929 12.243a8 8 0 0114.142 0M2.808 9.121a11.952 11.952 0 0118.384 0"
              />
            </svg>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 drop-shadow-sm">
          Unsupported Device
        </h1>

        {/* DESCRIPTION */}
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
          This application is optimized for{" "}
          <span className="font-semibold text-slate-800 dark:text-white">
            desktop devices only
          </span>
          .
        </p>

        <p className="text-slate-500 dark:text-slate-500 mb-8 text-xs">
          Please switch to a laptop or desktop browser such as Chrome, Edge, or Firefox.
        </p>

        {/* BUTTON */}
        <a
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
        >
          Back to Home
        </a>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
