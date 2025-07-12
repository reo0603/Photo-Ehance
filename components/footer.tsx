export default function Footer() {
  return (
    <footer className="w-full py-8 text-center text-sm text-gray-600 bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-12 shadow-inner">
      <div className="max-w-4xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} PhotoEnhance. All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="hover:underline text-gray-700">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline text-gray-700">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  )
}
