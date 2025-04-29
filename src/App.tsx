// import './App.css' // Removed as App.css was deleted during setup
import { useLaunchData } from '@/hooks/useLaunchData';

function App() {
  const { data, loading, error } = useLaunchData(5); // Fetch 5 upcoming launches

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">SpaceNext Launch Viewer</h1>
      
      {/* TODO: Add Loading and Error state handling */}
      {/* TODO: Pass 'data' to the carousel component */}
      
      {loading && <p>Loading launch data...</p>}
      {error && <p>Error loading data: {error.message}</p>} 
      {data && (
        <div>
          {/* Placeholder for where the carousel will go */}
          <p>Data loaded: {data.length} launches</p>
          {/* <LaunchCarousel launches={data} /> */}
        </div>
      )}
    </div>
  )
}

export default App;
