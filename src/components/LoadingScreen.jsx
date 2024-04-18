import React from "react";

const LoadingScreen = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center space-y-2 min-h-[calc(100vh_-_theme(safeArea))]">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-4xl font-bold leading-none">Loading</h1>
            <p className="text-sm opacity-60 animate-pulse">
              Please wait a moment while we load your content.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="grid w-8 h-8 rounded-full border-2 border-gray-100 border-dashed place-items-center border animate-pulse">
              <span className="w-2 h-2 rounded-full bg-gray-100 animate-pulse" />
            </div>
            <div className="grid w-8 h-8 rounded-full border-2 border-gray-100 border-dashed place-items-center border animate-pulse">
              <span className="w-2 h-2 rounded-full bg-gray-100 animate-pulse" />
            </div>
            <div className="grid w-8 h-8 rounded-full border-2 border-gray-100 border-dashed place-items-center border animate-pulse">
              <span className="w-2 h-2 rounded-full bg-gray-100 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
