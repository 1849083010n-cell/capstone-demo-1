import React, { useState } from 'react';
import { PlanningView } from './views/PlanningView';
import { CompanionView } from './views/CompanionView';
import { ProfileView } from './views/ProfileView';
import { BottomNav } from './components/BottomNav';

function App() {
  const [currentView, setCurrentView] = useState<'planning' | 'companion' | 'profile'>('planning');

  const renderView = () => {
    switch (currentView) {
      case 'planning':
        return <PlanningView />;
      case 'companion':
        return <CompanionView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <PlanningView />;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center">
        {/* Mobile Container Simulator for Desktop viewing */}
        <div className="w-full max-w-md h-full bg-white relative shadow-2xl overflow-hidden flex flex-col">
            <main className="flex-1 overflow-hidden relative">
                {renderView()}
            </main>
            <BottomNav currentView={currentView} setView={setCurrentView} />
        </div>
    </div>
  );
}

export default App;
