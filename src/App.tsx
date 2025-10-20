import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="flex gap-8 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          className="hover:opacity-80 transition-opacity"
        >
          <img src={viteLogo} className="h-20 w-20" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src={reactLogo}
            className="h-20 w-20 animate-spin"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center">Vite + React</h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <button
          onClick={() => setCount(count => count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-300 text-sm">
          Edit{' '}
          <code className="bg-gray-700 px-2 py-1 rounded text-xs">
            src/App.tsx
          </code>{' '}
          and save to test HMR
        </p>
      </div>

      <p className="text-gray-400 text-center mt-8 max-w-md">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
