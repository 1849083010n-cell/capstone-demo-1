import React, { useState } from 'react';
import { HK_ROUTES } from '../constants';
import { RouteCard } from '../components/RouteCard';
import { Route } from '../types';
import { MapPin, Users, Calendar, ChevronLeft, Download, MessageSquare, Share2 } from 'lucide-react';

export const PlanningView: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  // Detail View (Modal-like)
  if (selectedRoute) {
    return (
      <div className="flex flex-col h-full bg-white relative animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center text-white bg-gradient-to-b from-black/60 to-transparent">
          <button onClick={() => setSelectedRoute(null)} className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full"><Share2 size={20} /></button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="h-64 w-full shrink-0">
          <img src={selectedRoute.imageUrl} alt={selectedRoute.name} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white -mt-4 rounded-t-3xl relative z-0 p-5 pb-24">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedRoute.name}</h1>
          <div className="flex items-center text-gray-500 text-sm mb-6">
             <MapPin size={16} className="mr-1" /> {selectedRoute.startPoint} → {selectedRoute.endPoint}
          </div>

          {/* Action Tabs - Styled like "Two Steps Road" */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-xl text-green-700">
                <span className="text-lg font-bold">{selectedRoute.distance}</span>
                <span className="text-xs opacity-70">Distance</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-xl text-blue-700">
                <span className="text-lg font-bold">{selectedRoute.duration}</span>
                <span className="text-xs opacity-70">Duration</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-orange-50 rounded-xl text-orange-700">
                <span className="text-lg font-bold">{selectedRoute.difficulty}/5</span>
                <span className="text-xs opacity-70">Difficulty</span>
            </div>
          </div>

          {/* Section: Track Map Preview */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-3">Track Preview</h3>
            <div className="bg-gray-100 h-48 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                {/* Simulated Track Line */}
                <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 100" fill="none" stroke="red" strokeWidth="3">
                    <path d="M10,90 Q30,60 50,50 T90,10" strokeDasharray="5,5" />
                    <circle cx="10" cy="90" r="3" fill="green" stroke="none" />
                    <circle cx="90" cy="10" r="3" fill="red" stroke="none" />
                </svg>
                <span className="bg-white px-3 py-1 rounded shadow text-xs font-semibold z-10">Interactive Map Preview</span>
            </div>
          </div>

           {/* Section: Download */}
           <div className="mb-8 bg-gray-50 p-4 rounded-xl flex justify-between items-center">
             <div>
                <h4 className="font-bold text-gray-800">Offline Track</h4>
                <p className="text-xs text-gray-500">GPX format • 256 KB</p>
             </div>
             <button className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center text-sm font-medium active:bg-green-700">
                <Download size={16} className="mr-2" /> Download
             </button>
           </div>

           {/* Section: Comments */}
           <div>
             <h3 className="font-bold text-lg mb-3 flex items-center justify-between">
                Community Reviews 
                <span className="text-xs font-normal text-gray-500">128 reviews</span>
             </h3>
             <div className="space-y-4">
                {[1, 2].map(i => (
                    <div key={i} className="flex gap-3 border-b border-gray-100 pb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                             <img src={`https://picsum.photos/50/50?random=${i+20}`} className="w-full h-full" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-bold text-gray-700">Hiker User {i}</span>
                                <span className="text-xs text-gray-400">2 days ago</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Great trail! A bit slippery after the rain near the bus stop.</p>
                        </div>
                    </div>
                ))}
             </div>
             <button className="w-full mt-4 py-3 text-center text-green-600 font-medium border border-green-200 rounded-xl">
                 Write a Review
             </button>
           </div>
        </div>
      </div>
    );
  }

  // Main List View
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white p-4 pb-2 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-800 font-bold text-lg">
            <MapPin size={20} className="mr-1 text-green-600" />
            Hong Kong <span className="text-xs text-gray-400 ml-1">▼</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-full">
             <Share2 size={20} className="text-gray-600" />
          </div>
        </div>
        
        {/* Functional Buttons (Partner / Events) */}
        <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-orange-50 p-3 rounded-lg flex items-center justify-center space-x-2 border border-orange-100 opacity-60">
                <Users size={18} className="text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">Find Partner</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-center space-x-2 border border-blue-100 opacity-60">
                <Calendar size={18} className="text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Events</span>
            </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        <h2 className="font-bold text-gray-800 text-lg mb-2">Recommended Routes</h2>
        {HK_ROUTES.map(route => (
          <RouteCard key={route.id} route={route} onClick={setSelectedRoute} />
        ))}
        
        <div className="text-center py-8 text-gray-400 text-sm">
            End of recommendations
        </div>
      </div>
    </div>
  );
};
