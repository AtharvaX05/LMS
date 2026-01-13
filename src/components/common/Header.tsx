import React from 'react';

interface HeaderProps {
  title?: string;
  role?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'LSFI Platform', role = 'User' }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Role: {role}</span>
            <button className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span>👤</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
