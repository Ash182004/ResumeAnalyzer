export default function Footer() {
  return (
    <footer className="bg-[#FFFAFF] dark:bg-[#0A1045] border-t border-gray-200 dark:border-gray-700 py-6 mt-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} <span className="font-semibold text-sky-600 dark:text-sky-400">ResumeAnalyzer</span>. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-medium transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-medium transition"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-medium transition"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
