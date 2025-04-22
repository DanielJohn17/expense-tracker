import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col">
        <button
          className="bg-blue-100"
          onClick={() => setCount((count) => count + 1)}
        >
          Up
        </button>
        <button
          className="bg-red-100"
          onClick={() => setCount((count) => count - 1)}
        >
          Down
        </button>

        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
