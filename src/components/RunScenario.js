import React, { useState } from 'react';
import { Button } from '@material-ui/core';

export const RunScenario = ({ onClick }) => {
  const [text, setText] = useState('Run scenario');
  return (
    <Button
      style={{ marginLeft: '10px' }}
      variant="contained"
      color="primary"
      onClick={(ev) => {
        setText('Re-run scenario')
        onClick(ev)
      }}
    >
      {text}
    </Button>
  );
};

export default RunScenario;
