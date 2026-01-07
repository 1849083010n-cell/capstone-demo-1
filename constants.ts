import { Route, User, SavedTrack } from './types';

export const HK_ROUTES: Route[] = [
  {
    id: '1',
    name: 'Hong Kong Trail: Dragon\'s Back to Cape D\'Aguilar',
    region: 'Hong Kong Island',
    distance: '8.5 km',
    difficulty: 3,
    duration: '4h 30m',
    description: 'A classic scenic route combining the ridge walk of Dragon\'s Back with the coastal geology of Cape D\'Aguilar. Starting from To Tei Wan.',
    startPoint: 'To Tei Wan Bus Stop',
    endPoint: 'Cape D\'Aguilar',
    tags: ['Scenic', 'Coastal', 'Geology'],
    imageUrl: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: '2',
    name: 'Lion Rock Peak',
    region: 'Kowloon',
    distance: '6 km',
    difficulty: 4,
    duration: '3h',
    description: 'The iconic peak representing the spirit of Hong Kong people.',
    startPoint: 'Wong Tai Sin',
    endPoint: 'Lok Fu',
    tags: ['Mountain', 'City View'],
    imageUrl: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: '3',
    name: 'Sunset Peak',
    region: 'Lantau Island',
    distance: '9 km',
    difficulty: 4,
    duration: '5h',
    description: 'Famous for its silvergrass in autumn and stunning sunsets.',
    startPoint: 'Pak Kung Au',
    endPoint: 'Mui Wo',
    tags: ['Silvergrass', 'Sunset'],
    imageUrl: 'https://picsum.photos/800/400?random=3'
  }
];

export const MOCK_TEAM: User[] = [
  { id: 'u1', name: 'Me', avatar: 'https://picsum.photos/50/50?random=10', status: 'Hiking', location: { lat: 22.23, lng: 114.24 } },
  { id: 'u2', name: 'Alex', avatar: 'https://picsum.photos/50/50?random=11', status: 'Hiking', location: { lat: 22.231, lng: 114.241 } },
  { id: 'u3', name: 'Sarah', avatar: 'https://picsum.photos/50/50?random=12', status: 'Resting', location: { lat: 22.229, lng: 114.239 } },
];

export const SAVED_TRACKS: SavedTrack[] = [
  { id: 't1', name: 'Dragon\'s Back Loop', date: '2023-10-15', distance: '5.2 km', duration: '2h 10m', isUploaded: true },
  { id: 't2', name: 'High West Sunset', date: '2023-11-02', distance: '3.1 km', duration: '1h 30m', isUploaded: false },
];
