import React, { useState, useRef, useEffect } from 'react';
import { useOffice } from '../../context/OfficeContext';
import {
  Menu,
  Search,
  Calendar,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  User,
  Shield,
  LogOut,
  Sliders,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface TopBarProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar, isSidebarCollapsed = false }) => {
  const {
    setIsSearchModalOpen,
    setActiveSection,
    setActiveSubSection,
    stampStock,
    taxCases,
    dailyClosing
  } = useOffice();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  // Notifications computed
  const lowStockCount = stampStock.filter(s => s.status !== 'OK').length;
  const overdueTax = taxCases.filter(t => t.status === 'Overdue' || t.status === 'Documents Required').length;

  return (
    <header className="sticky top-0 z-30 h-[60px] bg-white border-b border-slate-200/90 px-4 flex items-center justify-between shadow-2xs select-none">
      {/* Left: Sidebar Toggle (Mobile only) & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200 shrink-0"
          title="Open Navigation Menu"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div
          onClick={() => setIsSearchModalOpen(true)}
          className="relative w-full max-w-md hidden sm:flex items-center cursor-pointer group"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-hover:text-[#1473E6] transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            readOnly
            placeholder="Search clients, receipts, transactions, CNIC, etc..."
            className="w-full h-[38px] pl-9 pr-14 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 group-hover:border-[#1473E6] group-hover:bg-white transition-all cursor-pointer shadow-2xs font-medium"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-md shadow-2xs">
              Ctrl + K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Chamber Status Pill */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/80 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Chamber 121 • Active</span>
        </div>

        {/* Date Display Pill */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-[#1473E6]" />
          <span>Monday, 22 September 2025</span>
        </div>

        {/* Notifications Icon with Badge */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#F43F5E] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-2xs">
              5
            </span>
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#DCE6F1] py-2 z-50 text-xs">
              <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-[#0D2344]">Notifications</span>
                <span className="text-[10px] text-[#1473E6] font-semibold cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                <div
                  onClick={() => {
                    setActiveSection('stamps');
                    setIsNotifOpen(false);
                  }}
                  className="p-3 hover:bg-slate-50 cursor-pointer flex gap-2.5 items-start"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">Low Stamp Stock Alert</div>
                    <div className="text-[11px] text-slate-500">
                      Rs. 50 and Rs. 5,000 stamps are below minimum reorder levels.
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">10 mins ago</div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActiveSection('tax');
                    setIsNotifOpen(false);
                  }}
                  className="p-3 hover:bg-slate-50 cursor-pointer flex gap-2.5 items-start"
                >
                  <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">Tax Filing Deadlines</div>
                    <div className="text-[11px] text-slate-500">
                      Muhammad Ali & Asad Khan return due date is 25 September.
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">25 mins ago</div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActiveSection('cash');
                    setActiveSubSection('daily-closing');
                    setIsNotifOpen(false);
                  }}
                  className="p-3 hover:bg-slate-50 cursor-pointer flex gap-2.5 items-start"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">Daily Cash Closing</div>
                    <div className="text-[11px] text-slate-500">
                      Today's expected cash in drawer is Rs. {dailyClosing.expectedCash.toLocaleString()}.
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">1 hour ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle (Visual) */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg text-slate-600 hover:text-[#0D2344] hover:bg-slate-100 transition-colors cursor-pointer"
          title="Toggle Dark/Light Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#1473E6] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              UA
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="font-bold text-xs text-[#0D2344]">Usama</div>
              <div className="text-[10px] font-medium text-[#60728D]">Admin</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* User Menu Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#DCE6F1] py-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-bold text-[#0D2344]">Usama Ali</div>
                <div className="text-[11px] text-slate-500">usama@ch.com</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Role: Administrator</div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveSection('users');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-slate-700 hover:bg-[#EEF6FF] hover:text-[#1473E6] cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Staff & Roles</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSection('audit');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-slate-700 hover:bg-[#EEF6FF] hover:text-[#1473E6] cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Audit Logs</span>
                </button>

                <button
                  onClick={() => {
                    setActiveSection('settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-slate-700 hover:bg-[#EEF6FF] hover:text-[#1473E6] cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>System Settings</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-rose-600 hover:bg-rose-50 cursor-pointer font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
