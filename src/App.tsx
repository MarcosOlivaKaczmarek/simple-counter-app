import { useState } from 'react';
import useCounters from './hooks/useCounters';

function App() {
  const { counters, addCounter, deleteCounter, increment, decrement, reset } = useCounters();
  const [newCounterName, setNewCounterName] = useState('');

  const handleAddCounter = () => {
    if (newCounterName.trim() !== '') {
      addCounter(newCounterName);
      setNewCounterName('');
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Counter List</h1>

        {/* Add Counter Form */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Counter Name"
            className="bg-gray-800 text-white rounded py-2 px-3 mr-2 focus:outline-none"
            value={newCounterName}
            onChange={(e) => setNewCounterName(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-green-300"
            onClick={handleAddCounter}
            disabled={newCounterName.trim() === ''}
          >
            Add Counter
          </button>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {counters.map((counter) => (
            <div key={counter.id} className="bg-gray-900 rounded p-4">
              <h2 className="text-xl font-semibold mb-2">{counter.name}</h2>
              <p className="text-4xl font-bold text-center mb-4">{counter.value}</p>
              <div className="flex justify-between items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => decrement(counter.id)}
                >
                  -
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => increment(counter.id)}
                >
                  +
                </button>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm"
                  onClick={() => reset(counter.id)}
                >
                  Reset
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                  onClick={() => deleteCounter(counter.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
