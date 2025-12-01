import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { Lead, Subscriber } from '../types';

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    setLeads(storage.getLeads());
    setSubscribers(storage.getSubscribers());
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      
      {/* Call Requests / Leads */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Call Requests ({leads.length})</h2>
        <div className="space-y-4">
          {leads.map(lead => (
            <div key={lead.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">{lead.name}</h3>
                <span className="text-xs text-neutral-500">{new Date(lead.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-red-400 mb-1">{lead.email}</p>
              {lead.phone && <p className="text-sm text-neutral-300 mb-2">📞 {lead.phone}</p>}
              {lead.message && (
                <div className="text-xs bg-neutral-950 p-2 rounded text-neutral-400 mt-2">
                  "{lead.message}"
                </div>
              )}
            </div>
          ))}
          {leads.length === 0 && <p className="text-neutral-500 italic">No leads yet.</p>}
        </div>
      </div>

      {/* Newsletter Subscribers */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Newsletter List ({subscribers.length})</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-950 border-b border-neutral-800">
              <tr>
                <th className="p-4 text-xs font-bold text-neutral-400 uppercase">Email</th>
                <th className="p-4 text-xs font-bold text-neutral-400 uppercase text-right">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(sub => (
                <tr key={sub.id} className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/50">
                  <td className="p-4 text-sm text-white">{sub.email}</td>
                  <td className="p-4 text-sm text-neutral-500 text-right">{new Date(sub.date).toLocaleDateString()}</td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                 <tr><td colSpan={2} className="p-4 text-neutral-500 italic text-center">No subscribers yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};