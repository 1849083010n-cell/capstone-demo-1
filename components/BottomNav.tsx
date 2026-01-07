import React from 'react';
import { Compass, Map, User } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  setView: (view: 'planning' | 'companion' | 'profile') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around z-50 pb-safe">
      <button 
        onClick={() => setView('planning')}
        className={`flex flex-col items-center justify-center w-full h-full ${currentView === 'planning' ? 'text-green-600' : 'text-gray-400'}`}
      >
        <Compass size={24} />
        <span className="text-[10px] mt-1 font-medium">Explore</span>
      </button>
      
      <button 
        onClick={() => setView('companion')}
        className={`flex flex-col items-center justify-center w-full h-full ${currentView === 'companion' ? 'text-green-600' : 'text-gray-400'}`}
      >
        <div className={`p-2 rounded-full mb-1 ${currentView === 'companion' ? 'bg-green-100' : ''}`}>
           <Map size={24} />
        </div>
        <span className="text-[10px] font-medium -mt-1">HikePal AI</span>
      </button>
      
      <button 
        onClick={() => setView('profile')}
        className={`flex flex-col items-center justify-center w-full h-full ${currentView === 'profile' ? 'text-green-600' : 'text-gray-400'}`}
      >
        <User size={24} />
        <span className="text-[10px] mt-1 font-medium">Me</span>
      </button>
    </div>
  );
};
