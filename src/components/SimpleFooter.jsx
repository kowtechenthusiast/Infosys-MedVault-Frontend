import React from "react";

export default function SimpleFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-10 py-4 border-t border-slate-200">
      <div className="flex justify-between items-center text-xs text-slate-500 max-w-full">
        <p className="font-medium">
          &copy; {year} MEDCORE. All Rights Reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
