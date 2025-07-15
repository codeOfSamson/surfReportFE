import React from 'react';

interface SurfSpotCardProps {
  name: string;
  waveHeight: number;
  windWaveDirection: string;
  swellPeriod: number;
}

const SurfSpotCard: React.FC<SurfSpotCardProps> = ({ name, waveHeight, windWaveDirection, swellPeriod }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center w-full max-w-xs mx-auto border border-blue-200 hover:shadow-lg transition-shadow duration-200">
      <div className="text-4xl mb-2">🏄‍♂️</div>
      <h2 className="text-xl font-bold mb-2 text-blue-700">{name}</h2>
      <div className="text-gray-700 text-base mb-1">Wave Height: <span className="font-semibold">{waveHeight.toFixed(2)} m</span></div>
      <div className="text-gray-700 text-base mb-1">Wind Wave Direction: <span className="font-semibold">{windWaveDirection}</span></div>
      <div className="text-gray-700 text-base">Swell Period: <span className="font-semibold">{swellPeriod.toFixed(1)} s</span></div>
    </div>
  );
};

export default SurfSpotCard; 