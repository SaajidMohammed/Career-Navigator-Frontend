import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext.jsx';

const TestComponent = () => {
  const { theme } = useContext(ThemeContext);

  if (!theme) {
    return <h1>Error: Theme is not defined!</h1>;
  }

  return (
    <h1 style={{ color: theme.colors.text, backgroundColor: theme.colors.background }}>
      Theme Context is Working!
    </h1>
  );
};

export default TestComponent;