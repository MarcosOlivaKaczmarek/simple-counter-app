import { useState, useEffect } from 'react';

interface Counter {
  id: string;
  name: string;
  value: number;
}

const LOCAL_STORAGE_KEY = 'counters';

function useCounters() {
  const [counters, setCounters] = useState<Counter[]>([]);

  useEffect(() => {
    const storedCounters = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCounters) {
      setCounters(JSON.parse(storedCounters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(counters));
  }, [counters]);

  const addCounter = (name: string) => {
    const newCounter: Counter = {
      id: crypto.randomUUID(),
      name,
      value: 0,
    };
    setCounters([...counters, newCounter]);
  };

  const deleteCounter = (id: string) => {
    setCounters(counters.filter((counter) => counter.id !== id));
  };

  const increment = (id: string) => {
    setCounters(
      counters.map((counter) =>
        counter.id === id ? { ...counter, value: counter.value + 1 } : counter
      )
    );
  };

  const decrement = (id: string) => {
    setCounters(
      counters.map((counter) =>
        counter.id === id ? { ...counter, value: counter.value - 1 } : counter
      )
    );
  };

  const reset = (id: string) => {
    setCounters(
      counters.map((counter) =>
        counter.id === id ? { ...counter, value: 0 } : counter
      )
    );
  };

  return {
    counters,
    addCounter,
    deleteCounter,
    increment,
    decrement,
    reset,
  };
}

export default useCounters;
