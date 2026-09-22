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
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#1473E6]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by client name, mobile, CNIC (36502-...), NTN, receipt #..."
            className="flex-1 text-sm text-[#0D2344] placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
          {/* Clients Section */}
          {matchedClients.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-2">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                <span>Clients & CRM ({matchedClients.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedClients.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedClientId(c.id);
                      setActiveSection('clients');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500">
                        CNIC: {c.cnic} | Tel: {c.phone} | {c.businessName || 'Individual'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
              <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-2">
                <Receipt className="w-3.5 h-3.5 text-emerald-500" />
                <span>Receipts ({matchedReceipts.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedReceipts.map(r => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setSelectedReceiptId(r.id);
                      setActiveSection('receipts');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-mono font-bold text-slate-900">{r.receiptNo}</div>
                      <div className="text-[11px] text-slate-500">
                        {r.clientName} - {r.service} ({r.dateTime})
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-600">Rs. {r.paidAmount.toLocaleString()}</span>
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
              <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-2">
                <Wallet className="w-3.5 h-3.5 text-indigo-500" />
                <span>Ledger Transactions ({matchedTransactions.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedTransactions.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setActiveSection('cash');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-2 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{t.clientOrPayee}</div>
                      <div className="text-[11px] text-slate-500">{t.serviceOrCategory} ({t.dateTime})</div>
                    </div>
                    <span className={`font-bold ${t.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'IN' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {q && matchedClients.length === 0 && matchedReceipts.length === 0 && matchedTransactions.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No matching records found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
