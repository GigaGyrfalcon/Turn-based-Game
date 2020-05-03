import React from 'react';
import './Map.scss';
import { BlockProps } from '../../code/interfaces';

function genMetrix(size: number) {
  return Array(size).fill(Array(size).fill(0));
}

function Block(props: BlockProps) {
  const { place } = props;

  return <div className={`block block-${place}`}></div>;
}

function Map(props: any) {
  const metrix = genMetrix(props.size);

  return (
    <div className='Map'>
      {metrix.map((row: number[], i: number) =>
        row.map((_, j: number) => (
          <Block key={`i=${i}-j=${j}`} place={`x${i}-y${j}`} />
        ))
      )}
    </div>
  );
}

export default Map;
