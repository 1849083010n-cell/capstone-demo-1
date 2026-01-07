import React, { useState } from 'react';
import { SAVED_TRACKS } from '../constants';
import { User, Settings, QrCode, Heart, Bookmark, Activity, ChevronRight, UploadCloud } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [status, setStatus] = useState('Happy');

  const stats = [
    { label: 'Total km', value: '128.5', unit: 'km' },
    { label: 'Elevation', value: '4,230', unit: 'm' },
    { label: 'Hours', value: '42.5', unit: 'h' },
  ];

  const moodOptions = ['Happy', 'Hiking', 'Resting', 'Lying Flat', 'Exhausted'];

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20 overflow-y-auto">
      {/* Header / Profile Card */}
      <div className="bg-white p-6 pb-8 rounded-b-3xl shadow-sm relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h1 className="text-xl font-bold text-gray-800">Homepage</h1>
          <button className="text-gray-400 hover:text-gray-600">
            <QrCode size={24} />
          </button>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-20 h-20 rounded-full border-4 border-green-50 overflow-hidden shadow-lg">
            <img src="https://picsum.photos/200/200?random=50" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">Hiker Joe</h2>
            <div className="flex items-center mt-1">
                 <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full border-none focus:ring-0 cursor-pointer"
                 >
                    {moodOptions.map(m => <option key={m} value={m}>{m}</option>)}
                 </select>
            </div>
            <p className="text-xs text-gray-400 mt-2">ID: 88293019</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between mt-8 relative z-10">
            {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                    <span className="text-xl font-black text-gray-800">{stat.value}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg text-red-500"><Heart size={20} /></div>
                    <span className="font-semibold text-gray-700">Favorites</span>
                </div>
                <span className="text-gray-400 text-sm">12</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-50 rounded-lg text-yellow-500"><Bookmark size={20} /></div>
                    <span className="font-semibold text-gray-700">Saved</span>
                </div>
                <span className="text-gray-400 text-sm">5</span>
            </div>
        </div>

        {/* Current Activity */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <Activity size={18} />
                    <span className="font-bold uppercase text-xs tracking-wider opacity-90">Active Event</span>
                </div>
                <h3 className="text-lg font-bold mb-1">Weekend Team Hike</h3>
                <p className="text-sm opacity-90 mb-3">Dragon's Back • 3 Members</p>
                <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <img key={i} src={`https://picsum.photos/40/40?random=${i+10}`} className="w-8 h-8 rounded-full border-2 border-green-500" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-green-500 bg-black/20 flex items-center justify-center text-xs font-bold">+1</div>
                </div>
             </div>
             <Activity className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-10" />
        </div>

        {/* Track Library */}
        <div>
            <div className="flex justify-between items-center mb-2 px-1">
                <h3 className="font-bold text-gray-800">Track Library</h3>
                <button className="text-xs text-green-600 font-semibold">View All</button>
            </div>
            <div className="space-y-3">
                {SAVED_TRACKS.map(track => (
                    <div key={track.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Activity size={20} className="text-gray-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{track.name}</h4>
                                <p className="text-xs text-gray-500">{track.date} • {track.distance}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                             {track.isUploaded ? (
                                 <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span>
                             ) : (
                                 <button className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                                     <UploadCloud size={10} /> Upload
                                 </button>
                             )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};
