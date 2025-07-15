import React, { useEffect, useState } from 'react';
import SurfSpotCard from './SurfSpotCard';

const spots = [
  { name: 'Wushigang', lat: 24.873146, lon: 121.841318 },
  { name: 'Choushui', lat: 24.857092, lon: 121.833262 },
  { name: 'Doublelions', lat: 24.888729, lon: 121.849696 },
  { name: 'Honeymoon Bay', lat: 24.932757, lon: 121.885916 },
];

interface SurfData {
  waveHeight: number;
  windWaveDirection: string;
  swellPeriod: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<(SurfData | null)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5250';
      const results = await Promise.all(
        spots.map(async (spot) => {
          try {
            const res = await fetch(`${baseUrl}/api/maritime?lat=${spot.lat}&lon=${spot.lon}`);
            if (!res.ok) return null;
            return await res.json();
          } catch {
            return null;
          }
        })
      );
      setData(results);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full fixed inset-0 bg-gradient-to-br from-yellow-100 to-blue-300 flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Taiwan Surf Forecast</h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <span className="text-6xl animate-bounce mb-4">🏄‍♂️</span>
          <span className="text-lg text-blue-700 font-semibold">Loading surf data...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {spots.map((spot, idx) =>
            data[idx] ? (
              <SurfSpotCard
                key={spot.name}
                name={spot.name}
                waveHeight={data[idx]!.waveHeight}
                windWaveDirection={data[idx]!.windWaveDirection}
                swellPeriod={data[idx]!.swellPeriod}
              />
            ) : (
              <div key={spot.name} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center w-full max-w-xs mx-auto border border-red-200 text-red-600">
                <div className="text-4xl mb-2">❌</div>
                <div className="font-semibold">Failed to load data for {spot.name}</div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default App;
