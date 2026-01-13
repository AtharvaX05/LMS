import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  role?: 'borrower' | 'bank-officer' | 'compliance';
}

const Sidebar: React.FC<SidebarProps> = ({ role = 'borrower' }) => {
  const location = useLocation();

  const menuItems = {
    borrower: [
      { label: 'Dashboard', href: '/borrower', icon: '📊' },
      { label: 'Loan Overview', href: '/borrower/loan', icon: '📄' },
      { label: 'Documents', href: '/borrower/documents', icon: '📁' },
      { label: 'Repayment', href: '/borrower/repayment', icon: '💳' },
    ],
    'bank-officer': [
      { label: 'Dashboard', href: '/bank-officer', icon: '📊' },
      { label: 'Portfolio', href: '/bank-officer/portfolio', icon: '💼' },
      { label: 'Approvals', href: '/bank-officer/approvals', icon: '✅' },
      { label: 'Risk Analysis', href: '/bank-officer/risk', icon: '⚠️' },
    ],
    compliance: [
      { label: 'Dashboard', href: '/compliance', icon: '📊' },
      { label: 'Audit Trail', href: '/compliance/audit', icon: '📋' },
      { label: 'Controls', href: '/compliance/controls', icon: '🔒' },
    ],
  };

  const items = menuItems[role] || [];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-bold">LSFI</h2>
      </div>
      <nav className="space-y-2 px-4">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
              location.pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
