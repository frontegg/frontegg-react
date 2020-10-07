import React, { FC, useState } from 'react';
import { Elements, fronteggElements as FE } from '@frontegg/react-core';
import { uiLibrary as S } from '@frontegg/react-elements-semantic';
import { uiLibrary as M } from '@frontegg/react-elements-material-ui';

const Semantic = S as Elements;
const Material = M as Elements;
const Frontegg = FE as Elements;


const Item: FC = ({ children }) => {
  return <div style={{
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: '4px',
    backgroundColor: '#e8e8e8',
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '16px',
    textAlign: 'center',
  }}>{children}</div>;
};
export const GridExamples: FC = () => {
  const [ex, setEx] = useState(1);
  return (
    <div>
      <div>
        {[1, 2,3, 4].map(i => <span key={i} style={{
          fontWeight: 'bold',
          fontSize: 20,
          padding: 16,
          display: 'inline-block',
          color: ex === i ? 'red' : 'initial',
          cursor: 'pointer',
        }} onClick={() => setEx(i)}>
          Example {i}
        </span>)}
      </div>
      {ex === 1 && [[Frontegg, 'Frontegg Grid'], [Material, 'Material Grid']].map(([ll, name]) => {
        const Lib = ll as any;
        return <>
          <h1>{name} EX.1</h1>
          <Lib.Grid container spacing={3}>
            <Lib.Grid item xs={12}>
              <Item>xs=12</Item>
            </Lib.Grid>
            <Lib.Grid item xs={6}>
              <Item>xs=6</Item>
            </Lib.Grid>
            <Lib.Grid item xs={6}>
              <Item>xs=6</Item>
            </Lib.Grid>

            <Lib.Grid item xs={3}>
              <Item>xs=3</Item>
            </Lib.Grid>
            <Lib.Grid item xs={3}>
              <Item>xs=3</Item>
            </Lib.Grid>
            <Lib.Grid item xs={3}>
              <Item>xs=3</Item>
            </Lib.Grid>
            <Lib.Grid item xs={3}>
              <Item>xs=3</Item>
            </Lib.Grid>
          </Lib.Grid>
        </>;
      })}

      {ex === 2 && [[Frontegg, 'Frontegg Grid'], [Material, 'Material Grid']].map(([ll, name]) => {
        const Lib = ll as any;
        return <>
          <h1>{name} EX.2 (Grid with breakpoints)</h1>

          <Lib.Grid container spacing={3}>
            <Lib.Grid item xs={12}>
              <Item>xs=12</Item>
            </Lib.Grid>
            <Lib.Grid item xs={12} sm={6}>
              <Item>xs=12 sm=6</Item>
            </Lib.Grid>
            <Lib.Grid item xs={12} sm={6}>
              <Item>xs=12 sm=6</Item>
            </Lib.Grid>
            <Lib.Grid item xs={6} sm={3}>
              <Item>xs=6 sm=3</Item>
            </Lib.Grid>
            <Lib.Grid item xs={6} sm={3}>
              <Item>xs=6 sm=3</Item>
            </Lib.Grid>
            <Lib.Grid item xs={6} sm={3}>
              <Item>xs=6 sm=3</Item>
            </Lib.Grid>
            <Lib.Grid item xs={6} sm={3}>
              <Item>xs=6 sm=3</Item>
            </Lib.Grid>
          </Lib.Grid>
        </>;
      })}

      {ex === 3 && [[Frontegg, 'Frontegg Grid'], [Material, 'Material Grid']].map(([ll, name]) => {
        const Lib = ll as any;
        return <>
          <h1>{name} EX.3 (Auto Layout)</h1>
          <Lib.Grid container spacing={3}>
            <Lib.Grid item xs>
              <Item>xs</Item>
            </Lib.Grid>
            <Lib.Grid item xs>
              <Item>xs</Item>
            </Lib.Grid>
            <Lib.Grid item xs>
              <Item>xs</Item>
            </Lib.Grid>
          </Lib.Grid>
          <Lib.Grid container spacing={3}>
            <Lib.Grid item xs>
              <Item>xs</Item>
            </Lib.Grid>
            <Lib.Grid item xs={6}>
              <Item>xs=6</Item>
            </Lib.Grid>
            <Lib.Grid item xs>
              <Item>xs</Item>
            </Lib.Grid>
          </Lib.Grid>
        </>;
      })}

      {ex === 4 && [[Frontegg, 'Frontegg Grid'], [Material, 'Material Grid']].map(([ll, name]) => {
        const Lib = ll as any;

        function FormRow() {
          return (
            <React.Fragment>
              <Lib.Grid item xs={4}>
                <Item>item</Item>
              </Lib.Grid>
              <Lib.Grid item xs={4}>
                <Item>item</Item>
              </Lib.Grid>
              <Lib.Grid item xs={4}>
                <Item>item</Item>
              </Lib.Grid>
            </React.Fragment>
          );
        }

        return <>
          <h1>{name} EX.3 (Nested Grid)</h1>
          <Lib.Grid container spacing={1}>
            <Lib.Grid container item xs={12} spacing={3}>
              <FormRow />
            </Lib.Grid>
            <Lib.Grid container item xs={12} spacing={3}>
              <FormRow />
            </Lib.Grid>
            <Lib.Grid container item xs={12} spacing={3}>
              <FormRow />
            </Lib.Grid>
          </Lib.Grid>
        </>;
      })}
    </div>
  );
};
