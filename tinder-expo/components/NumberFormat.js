import React from 'react';
import ReactNumberFormat from 'react-number-format';

export function NumberFormat({ value }) {
  return (
    <ReactNumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'$'}
      renderText={formattedValue => <Text>{formattedValue}</Text>}
    />
  );
}
