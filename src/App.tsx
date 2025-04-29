// import './App.css' // Removed as App.css was deleted during setup
import { useLaunchData } from '@/hooks/useLaunchData';
import LoadingSpinner from '@/components/LoadingSpinner'; // Import the spinner
import ErrorMessage from '@/components/ErrorMessage'; // Import the error message component
import LaunchCarousel from '@/components/LaunchCarousel/LaunchCarousel'; // Import the carousel
import Header from '@/components/Header'; // Import the new header

function App() {
  const { data, loading, error } = useLaunchData(5); // Fetch 5 upcoming launches

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-8 pb-8 px-4">
      <Header />
      
      <main className="w-full flex flex-col items-center mt-8">
        {loading && <LoadingSpinner />} {/* Use the spinner */}
        {error && <ErrorMessage message={error.message} />} {/* Use the error message component */}
        {data && <LaunchCarousel launches={data} />} {/* Pass data to carousel */}
      </main>
    </div>
  )
}

export default App;
