import React, { FC, useCallback, useState } from 'react';
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
  { label: 'Pulp Fiction', value: '19924' },
  { label: 'The Lord of the Rings: The Return of the King', value: '2003' },
  { label: 'The Good, the Bad and the Ugly', value: '1966' },
  { label: 'Fight Club', value: '1999' },
  { label: 'The Lord of the Rings: The Fellowship of the Ring', value: '2001' },
  { label: 'Star Wars: Episode V - The Empire Strikes Back', value: '1980' },
  { label: 'Forrest Gump', value: '43223' },
  { label: 'Inception', value: '2010' },
  { label: 'The Lord of the Rings: The Two Towers', value: '2002' },
  { label: "One Flew Over the Cuckoo's Nest", value: '1975' },
  { label: 'Goodfellas', value: '1990' },
  { label: 'The Matrix', value: '19991' },
];

export const SelectorExample: FC = () => {
  const [value, setValue] = useState<Array<any>>([]);
  const [semanticValue, setSemanticValue] = useState<Array<any>>([]);
  const [materialValue, setMaterialvalue] = useState<Array<any>>([]);

  const [open, setOpen] = useState({
    material: false,
    semantic: false,
    core: false,
  });

  const [loading, setLoading] = useState(false);

  const onOpenMaterial = () => setOpen({ material: true, core: false, semantic: false });
  const onCloseMaterial = () => setOpen({ material: false, core: false, semantic: false });
  const onOpenSemantic = () => setOpen({ material: false, core: false, semantic: true });
  const onCloseSemantic = () => setOpen({ material: false, core: false, semantic: false });
  const onOpenCore = () => setOpen({ material: false, core: true, semantic: false });
  const onCloseCore = () => setOpen({ material: false, core: false, semantic: false });

  const getOptionLabel = (option: any) => {
    return option.label;
  };

  const renderOption = (option: any, state: any) => {
    return <span style={{ background: 'pink' }}>{option.label}</span>;
  };

  const onChange = useCallback((_e, newValue: Array<any>) => {
    setValue(newValue);
  }, []);

  const onSmanticChange = useCallback((_e, newValue: Array<any>) => {
    setSemanticValue(newValue);
  }, []);

  const onMaterialChange = useCallback((_e, newValue: Array<any>) => {
    setMaterialvalue(newValue);
  }, []);

  return (
    <div style={{ margin: '30px' }}>
      <ME.Select
        size='small'
        label='Selector'
        // open={open.material}
        loading={loading}
        // onOpen={onOpenMaterial}
        theme='danger'
        // onClose={onCloseMaterial}
        multiselect={true}
        options={top100Films}
        value={materialValue}
        onChange={onMaterialChange}
        getOptionLabel={getOptionLabel}
        // renderOption={renderOption}
      />
      <br />
      <br />

      <FE.Select
        size='medium'
        label='Selector'
        open={open.core}
        loading={loading}
        onOpen={onOpenCore}
        theme='secondary'
        onClose={onCloseCore}
        multiselect={true}
        options={top100Films}
        value={value}
        onChange={onChange}
        getOptionLabel={getOptionLabel}
        // renderOption={renderOption}
      />
      <br />
      <br />
      <SE.Select
        size='medium'
        label='Selector'
        open={open.semantic}
        loading={loading}
        onOpen={onOpenSemantic}
        onClose={onCloseSemantic}
        theme='secondary'
        multiselect={true}
        options={top100Films}
        value={semanticValue}
        onChange={onSmanticChange}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
      />
    </div>
  );
};
