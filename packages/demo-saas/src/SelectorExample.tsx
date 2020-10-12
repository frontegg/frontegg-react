import React, { FC, useCallback, useEffect, useState } from 'react';
import { uiLibrary as Semantic } from '@frontegg/react-elements-semantic';
import { uiLibrary as Material } from '@frontegg/react-elements-material-ui';
import { Elements, fronteggElements as Frontegg } from '@frontegg/react-core';

const FE = Frontegg as Elements;
const ME = Material as Elements;
const SE = Semantic as Elements;

const top100Films = [
  { label: 'The Shawshank Redemption', value: '1994' },
  { label: 'The Godfather', value: '1972' },
  { label: 'The Godfather: Part II', value: '1974' },
  { label: 'The Dark Knight', value: '2008' },
  { label: '12 Angry Men', value: '1957' },
  { label: "Schindler's List", value: '1993' },
  { label: 'Pulp Fiction', value: '1994' },
  { label: 'The Lord of the Rings: The Return of the King', value: '2003' },
  { label: 'The Good, the Bad and the Ugly', value: '1966' },
  { label: 'Fight Club', value: '1999' },
  { label: 'The Lord of the Rings: The Fellowship of the Ring', value: '2001' },
  { label: 'Star Wars: Episode V - The Empire Strikes Back', value: '1980' },
  { label: 'Forrest Gump', value: '1994' },
  { label: 'Inception', value: '2010' },
  { label: 'The Lord of the Rings: The Two Towers', value: '2002' },
  { label: "One Flew Over the Cuckoo's Nest", value: '1975' },
  { label: 'Goodfellas', value: '1990' },
  { label: 'The Matrix', value: '1999' },
];

export const SelectorExample: FC = () => {
  const [value, setValue] = useState<Array<any>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const getOptionLabel = (option: any) => {
    return option.label;
  };

  const renderOption = (option: any, state: any) => {
    console.log(state);
    return <span>{option.label}</span>;
  };

  const onChange = useCallback((_e, newValue: Array<any>) => {
    setValue(newValue);
  }, []);

  return (
    <div style={{ margin: '30px' }}>
      {
        <ME.Select
          size='medium'
          label='Selector'
          open={open}
          loading={loading}
          onOpen={onOpen}
          theme='secondary'
          onClose={onClose}
          multiselect={true}
          options={top100Films}
          value={value}
          onChange={onChange}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
        />
      }
    </div>
  );
};
