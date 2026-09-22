import React, { useState } from 'react';
import { useOffice } from '../../context/OfficeContext';
import { Search, X, Users, Receipt, FileText, ArrowRight, Wallet } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    clients,
    receipts,
    transactions,
    taxCases,
    setActiveSection,
    setSelectedClientId,
    setSelectedReceiptId
  } = useOffice();

  const [query, setQuery] = useState('');

  if (!isSearchModalOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedClients = q
    ? clients.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.cnic.toLowerCase().includes(q) ||
          (c.phone || c.mobile || '').includes(q) ||
          (c.ntn && c.ntn.includes(q))
      )
    : clients.slice(0, 3);

  const matchedReceipts = q
    ? receipts.filter(
        r =>
          r.receiptNo.toLowerCase().includes(q) ||
          r.clientName.toLowerCase().includes(q) ||
          r.service.toLowerCase().includes(q)
      )
    : receipts.slice(0, 3);

  const matchedTransactions = q
    ? transactions.filter(
        t =>
          t.clientOrPayee.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.serviceOrCategory.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16">
      <div className="bg-white rounded-2xl border border-[#DCE6F1] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4.5 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#1473E6] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by client name, mobile, CNIC (36502-...), NTN, receipt #..."
            className="flex-1 text-base text-slate-900 placeholder-slate-400 focus:outline-hidden font-medium"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4.5 max-h-96 overflow-y-auto space-y-5 text-sm custom-scrollbar">
          {/* Clients Section */}
          {matchedClients.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-xs mb-2.5">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Clients & CRM ({matchedClients.length})</span>
              </div>
              <div className="space-y-2">
                {matchedClients.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedClientId(c.id);
                      setActiveSection('clients');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-3 rounded-xl border border-slate-200/80 hover:border-[#1473E6] hover:bg-blue-50/40 flex items-center justify-between cursor-pointer transition-all shadow-2xs"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 font-heading">{c.name}</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        CNIC: <span className="font-mono">{c.cnic}</span> | Tel: <span className="font-mono">{c.phone}</span> | {c.businessName || 'Individual'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <StatusBadge status={c.status} />
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Receipts Section */}
          {matchedReceipts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-xs mb-2.5">
                <Receipt className="w-4 h-4 text-emerald-500" />
                <span>Receipts ({matchedReceipts.length})</span>
              </div>
              <div className="space-y-2">
                {matchedReceipts.map(r => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setSelectedReceiptId(r.id);
                      setActiveSection('receipts');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-3 rounded-xl border border-slate-200/80 hover:border-emerald-400 hover:bg-emerald-50/40 flex items-center justify-between cursor-pointer transition-all shadow-2xs"
                  >
                    <div>
                      <div className="font-mono font-bold text-sm text-slate-900">{r.receiptNo}</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {r.clientName} - {r.service} ({r.dateTime})
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold font-mono text-sm text-emerald-600">Rs. {r.paidAmount.toLocaleString()}</span>
                      <StatusBadge status={r.status} />
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transactions Section */}
          {matchedTransactions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-xs mb-2.5">
                <Wallet className="w-4 h-4 text-indigo-500" />
                <span>Ledger Transactions ({matchedTransactions.length})</span>
              </div>
              <div className="space-y-2">
                {matchedTransactions.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setActiveSection('cash');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-3 rounded-xl border border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/40 flex items-center justify-between cursor-pointer transition-all shadow-2xs"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">{t.clientOrPayee}</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">{t.serviceOrCategory} ({t.dateTime})</div>
                    </div>
                    <span className={`font-bold font-mono text-sm ${t.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'IN' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {q && matchedClients.length === 0 && matchedReceipts.length === 0 && matchedTransactions.length === 0 && (
            <div className="text-center py-8 text-sm text-slate-500 font-medium">
              No matching records found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
