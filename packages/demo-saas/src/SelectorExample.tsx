import React, { FC, useCallback, useEffect, useState } from 'react';
import { uiLibrary as Semantic } from '@frontegg/react-elements-semantic';
import { uiLibrary as Material } from '@frontegg/react-elements-material-ui';
import { Elements, fronteggElements as Frontegg } from '@frontegg/react-core';

const FE = Frontegg as Elements;
const ME = Material as Elements;
const SE = Semantic as Elements;

const top100Films = [
  { label: 'The Shawshank Redemption', key: 1994 },
  { label: 'The Godfather', key: 1972 },
  { label: 'The Godfather: Part II', key: 1974 },
  { label: 'The Dark Knight', key: 2008 },
  { label: '12 Angry Men', key: 1957 },
  { label: "Schindler's List", key: 1993 },
  { label: 'Pulp Fiction', key: 1994 },
  { label: 'The Lord of the Rings: The Return of the King', key: 2003 },
  { label: 'The Good, the Bad and the Ugly', key: 1966 },
  { label: 'Fight Club', key: 1999 },
  { label: 'The Lord of the Rings: The Fellowship of the Ring', key: 2001 },
  { label: 'Star Wars: Episode V - The Empire Strikes Back', key: 1980 },
  { label: 'Forrest Gump', key: 1994 },
  { label: 'Inception', key: 2010 },
  { label: 'The Lord of the Rings: The Two Towers', key: 2002 },
  { label: "One Flew Over the Cuckoo's Nest", key: 1975 },
  { label: 'Goodfellas', key: 1990 },
  { label: 'The Matrix', key: 1999 },
];

export const SelectorExample: FC = () => {
  const [value, setValue] = useState<Array<any>>([]);

  const onChange = useCallback((_e, newValue: Array<any>) => {
    setValue([...newValue]);
  }, []);

  return (
    <div style={{ margin: '30px' }}>{/*<ME.Select options={top100Films} value={value} onChange={onChange} />*/}</div>
  );
};
