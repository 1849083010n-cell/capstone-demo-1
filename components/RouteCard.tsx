import React from 'react';
import { Route } from '../types';
import { MapPin, Clock, Footprints } from 'lucide-react';

interface RouteCardProps {
  route: Route;
  onClick: (route: Route) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onClick }) => {
  return (
    <div 
      onClick={() => onClick(route)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden active:scale-95 transition-transform cursor-pointer"
    >
      <div className="h-32 w-full relative">
        <img src={route.imageUrl} alt={route.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {route.region}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 leading-tight mb-2">{route.name}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Footprints size={14} className="mr-1 text-green-600" />
            {route.distance}
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-blue-600" />
            {route.duration}
          </div>
          <div className="flex items-center">
             <span className="text-yellow-500 font-bold mr-1">{'★'.repeat(route.difficulty)}</span>
             <span className="text-gray-300">{'★'.repeat(5-route.difficulty)}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
            {route.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">#{tag}</span>
            ))}
        </div>
      </div>
    </div>
  );
};
