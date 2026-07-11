'use client';

import { useState } from 'react';
import SermonsManager from './SermonsManager';
import EventsManager from './EventsManager';
import TestimoniesManager from './TestimoniesManager';
type Tab = 'sermons' | 'events' | 'testimonies';

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('sermons');

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 mb-8">
      {(['sermons', 'events', 'testimonies'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'sermons' ? (
        <SermonsManager />
      ) : activeTab === 'events' ? (
        <EventsManager />
      ) : (
        <TestimoniesManager />
      )}
    </div>
  );
}
