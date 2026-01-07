import React, { useState, useEffect, useRef } from 'react';
import { MOCK_TEAM } from '../constants';
import { ChatMessage } from '../types';
import { getHikeAdvice } from '../services/geminiService';
import { Send, Map as MapIcon, Mic, Camera, Navigation, AlertTriangle, Users, MessageCircle, X } from 'lucide-react';
import L from 'leaflet';

// Dragon's Back Route Data (Detailed curve to look realistic)
const ROUTE_PATH: [number, number][] = [
    [22.2261, 114.2346], // Start: To Tei Wan
    [22.2280, 114.2370],
    [22.2315, 114.2393], 
    [22.2345, 114.2385], // Shek O Peak
    [22.2380, 114.2370],
    [22.2410, 114.2390],
    [22.2430, 114.2410],
    [22.2450, 114.2430], // Big Wave Bay (End)
];

const POIS = [
    { name: "Start: To Tei Wan", lat: 22.2261, lng: 114.2346, type: 'start' },
    { name: "Shek O Peak", lat: 22.2345, lng: 114.2385, type: 'peak' },
    { name: "Public Toilet (Start)", lat: 22.2258, lng: 114.2348, type: 'toilet' },
    { name: "Public Toilet (Big Wave Bay)", lat: 22.2445, lng: 114.2435, type: 'toilet' },
    { name: "Smoking Area (Bus Stop)", lat: 22.2263, lng: 114.2343, type: 'smoking' },
];

export const CompanionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'team'>('ai');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', sender: 'ai', text: 'Hi! I\'m your HikePal AI. We are at To Tei Wan Bus Stop. How can I help? Need info on water, toilets, or withdrawal routes?', timestamp: new Date() }
  ]);
  const [teamMessages, setTeamMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Mock location context for Dragon's Back start
  const locationContext = { lat: 22.226, lng: 114.234 };

  // Helper to create DivIcons using simple HTML/SVG
  const createCustomIcon = (type: 'start' | 'peak' | 'toilet' | 'smoking' | 'user' | 'teammate', label?: string) => {
    let iconHtml = '';
    
    switch (type) {
        case 'start':
            iconHtml = `<div class="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold">S</div>`;
            break;
        case 'peak':
            iconHtml = `<div class="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white">⛰️</div>`;
            break;
        case 'toilet':
            iconHtml = `<div class="w-7 h-7 bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-xs">WC</div>`;
            break;
        case 'smoking':
            iconHtml = `<div class="w-7 h-7 bg-gray-600 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-[10px]">🚬</div>`;
            break;
        case 'user':
            iconHtml = `<div class="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative"><div class="w-3 h-3 bg-blue-200 rounded-full animate-ping absolute"></div><div class="w-3 h-3 bg-white rounded-full"></div></div>`;
            break;
        case 'teammate':
            iconHtml = `<div class="w-8 h-8 rounded-full border-2 border-orange-500 shadow-md overflow-hidden bg-gray-200"><img src="https://picsum.photos/50/50?random=${label?.charCodeAt(0) || 1}" class="w-full h-full object-cover" /></div>`;
            break;
    }

    return L.divIcon({
        className: 'bg-transparent',
        html: iconHtml,
        iconSize: type === 'user' || type === 'teammate' ? [32, 32] : [28, 28],
        iconAnchor: [14, 14], // Center the icon
        popupAnchor: [0, -14]
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // 1. Initialize Map
    const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
    });

    // 2. Add Tiles (CartoDB Voyager - good for hiking apps)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // 3. Draw Route Polyline
    const routePolyline = L.polyline(ROUTE_PATH, {
        color: '#10b981', // green-500
        weight: 6,
        opacity: 0.9,
        lineJoin: 'round'
    }).addTo(map);

    // 4. CRITICAL: Fit bounds to ensure map is not in the sea, adding padding for UI elements
    map.fitBounds(routePolyline.getBounds(), {
        paddingTopLeft: [20, 100], // Push down slightly from top HUD
        paddingBottomRight: [20, 300] // Push up from bottom sheet
    });

    // 5. Add POI Markers
    POIS.forEach(poi => {
        L.marker([poi.lat, poi.lng], {
            icon: createCustomIcon(poi.type as any)
        }).addTo(map).bindPopup(poi.name);
    });

    // 6. Add User Marker (Start location)
    L.marker([22.2261, 114.2346], {
        icon: createCustomIcon('user'),
        zIndexOffset: 1000
    }).addTo(map);

    // 7. Add Teammate Markers
    MOCK_TEAM.filter(u => u.id !== 'u1').forEach(user => {
         L.marker([user.location!.lat, user.location!.lng], {
            icon: createCustomIcon('teammate', user.name),
            zIndexOffset: 900
         }).addTo(map).bindTooltip(user.name, { 
             permanent: true, 
             direction: 'bottom', 
             className: 'bg-white/90 px-2 py-0.5 rounded text-[10px] shadow font-bold text-gray-700 border-none mt-2' 
         });
    });

    mapInstanceRef.current = map;

    return () => {
        map.remove();
        mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, teamMessages, activeTab]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (activeTab === 'ai') {
        const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        const aiResponseText = await getHikeAdvice(userMsg.text, locationContext);
        
        const aiMsg: ChatMessage = { 
            id: (Date.now() + 1).toString(), 
            sender: 'ai', 
            text: aiResponseText, 
            timestamp: new Date(),
            isMapResult: aiResponseText.includes('map') || aiResponseText.includes('coordinates') 
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(false);
    } else {
        const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input, timestamp: new Date() };
        setTeamMessages(prev => [...prev, userMsg]);
        setInput('');
        // Mock reply
        setTimeout(() => {
            setTeamMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'teammate',
                senderName: 'Alex',
                text: 'Copy that! I am about 200m ahead near the peak.',
                timestamp: new Date()
            }]);
        }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white relative overflow-hidden">
      
      {/* Interactive Map Layer */}
      <div id="map" ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full bg-gray-200" />

      {/* Top HUD */}
      <div className="relative z-10 p-4 pt-8 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex justify-between items-start pointer-events-none h-32">
        <div className="pointer-events-auto">
            <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-white drop-shadow-md">Dragon's Back</h2>
                <span className="bg-red-500 text-xs px-2 py-0.5 rounded animate-pulse shadow-sm">LIVE</span>
            </div>
            <p className="text-xs text-gray-100 font-medium drop-shadow">To Tei Wan • Elv: 124m</p>
        </div>
        <div className="flex gap-2 pointer-events-auto">
            <button className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 active:scale-95 transition-transform shadow-lg hover:bg-white/30">
                <AlertTriangle size={20} className="text-yellow-400" />
            </button>
            <button className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 active:scale-95 transition-transform shadow-lg hover:bg-white/30">
                <Users size={20} className="text-blue-300" />
            </button>
        </div>
      </div>

      {/* Main Interaction Area */}
      <div className="flex-1 relative z-10 flex flex-col justify-end pointer-events-none">
        
        {/* Floating Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 pointer-events-auto">
             <button className="w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform">
                <Camera size={24} />
             </button>
             <button className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-gray-800'}`} onClick={() => setIsRecording(!isRecording)}>
                <div className={`w-4 h-4 rounded-sm ${isRecording ? 'bg-white' : 'bg-red-500 rounded-full'}`} />
             </button>
        </div>

        {/* Chat/Info Panel */}
        <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] h-[55%] flex flex-col overflow-hidden text-gray-800 pointer-events-auto">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
                <button 
                    onClick={() => setActiveTab('ai')}
                    className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'text-green-600 border-b-2 border-green-600 bg-green-50/50' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                    <MessageCircle size={16} /> AI Companion
                </button>
                <button 
                    onClick={() => setActiveTab('team')}
                    className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                    <Users size={16} /> Team ({MOCK_TEAM.length})
                </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {(activeTab === 'ai' ? messages : teamMessages).map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                            msg.sender === 'user' 
                                ? 'bg-green-600 text-white rounded-tr-none' 
                                : msg.sender === 'ai' 
                                    ? 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                                    : 'bg-blue-100 text-blue-900 rounded-tl-none'
                        }`}>
                            {msg.sender === 'teammate' && <p className="text-xs font-bold mb-1 text-blue-700">{msg.senderName}</p>}
                            <p>{msg.text}</p>
                            {msg.isMapResult && (
                                <div className="mt-2 text-xs text-blue-600 flex items-center bg-blue-50 p-1 rounded">
                                    <MapIcon size={12} className="mr-1" /> Locations highlighted on map
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && activeTab === 'ai' && (
                     <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-gray-500 animate-pulse">
                           AI is thinking...
                        </div>
                     </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 pb-safe">
                <button className="p-2 text-gray-400 hover:text-gray-600 active:bg-gray-100 rounded-full">
                    <Mic size={20} />
                </button>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={activeTab === 'ai' ? "Ask about water, toilets..." : "Message team..."}
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent border-2"
                />
                <button 
                    onClick={handleSendMessage}
                    className={`p-2 rounded-full transition-colors ${input.trim() ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-400'}`}
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};