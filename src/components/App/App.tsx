import React, { useState, useEffect } from 'react';
import isEqual from 'lodash.isequal';
import './App.scss';
import Map from '../Map/Map';
import {
  PlayerInterface,
  ActionType,
  AccountProps,
} from '../../code/interfaces';
import { Player } from '../../code/player';
import { getRandomCoordinates, handlerAction } from '../../code/game';

function Account(prop: AccountProps) {
  return (
    <span className={prop.classes}>
      {prop.player.name} - health: {prop.player.soldier.health}%
    </span>
  );
}

const removeOldBlock = (className: string) => {
  const oldBlocks = document.querySelectorAll(`.${className}`);
  oldBlocks.forEach((block) => {
    block.classList.remove(className);
    block.classList.remove('block-aim-up');
    block.classList.remove('block-aim-down');
    block.classList.remove('block-aim-left');
    block.classList.remove('block-aim-right');
  });
};

const setSpot = (selector: string, aim: string, className: string) => {
  const block = document.querySelector(selector);
  if (block) {
    block.classList.add(className);
    block.classList.add(aim);
  }
};

const setSoldierOnBlock = (players: PlayerInterface[]) => {
  const [home, away] = players;
  removeOldBlock('block-home');
  removeOldBlock('block-away');
  setSpot(
    `.block-x${home.soldier.coordinates.x}-y${home.soldier.coordinates.y}`,
    `block-aim-${home.soldier.aim}`,
    'block-home'
  );
  setSpot(
    `.block-x${away.soldier.coordinates.x}-y${away.soldier.coordinates.y}`,
    `block-aim-${away.soldier.aim}`,
    'block-away'
  );
};

function App() {
  const mapSize = 10;

  // Pre generated players
  // const coordinates1 = getRandomCoordinates(mapSize);
  // const coordinates2 = getRandomCoordinates(mapSize);
  // const [players, setPlayers] = useState<PlayerInterface[]>([
  //   new Player('Giga', coordinates1),
  //   new Player('Gela', coordinates2),
  // ]);

  const [players, setPlayers] = useState<PlayerInterface[]>([]);

  const [turn, setTurn] = useState<number>(0);
  const [countMoves, setCountMoves] = useState<number>(0);
  if (players.length > 1) {
    setSoldierOnBlock(players);
  }

  const keydownListener = (event: KeyboardEvent) => {
    if (players.length < 2) return;
    const { soldier } = players[turn];
    const targetPlayer = turn === 0 ? players[1] : players[0];
    const actionResponse = handlerAction(event, soldier, targetPlayer.soldier);
    if (
      actionResponse.type === ActionType.INVALID ||
      (actionResponse.type === ActionType.MOVED && countMoves >= 4)
    ) {
      alert(
        'Use arrows for move or use key A for shoot sniper or use key Z for shoot pistol'
      );
      return;
    }
    if (actionResponse.type === ActionType.SHOT) {
      // Change turn if soldier shot
      turn === 0 ? setTurn(1) : setTurn(0);
      setCountMoves(0);
    }
    if (
      actionResponse.type === ActionType.MOVED &&
      !isEqual(soldier.coordinates, actionResponse.payload)
    ) {
      setCountMoves(countMoves + 1);
      if (actionResponse.payload) {
        soldier.updateCoordinates(actionResponse.payload);
      }
      if (actionResponse.aim) {
        soldier.updateAim(actionResponse.aim);
      }
      setSoldierOnBlock(players);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keydownListener);
    return () => {
      window.removeEventListener('keydown', keydownListener);
    };
  });

  const createPlayer = () => {
    const name = prompt('Enter player name');
    const coordinates = getRandomCoordinates(mapSize);
    if (name) setPlayers([...players, new Player(name, coordinates)]);
  };

  return (
    <div className='App'>
      <h1>Turn-based Game</h1>
      {players.length < 2 ? (
        <button type='button' onClick={createPlayer}>
          Add players
        </button>
      ) : (
        <div className='players'>
          {players.map((player, index) => (
            <Account
              classes={`players-num${index}`}
              key={index}
              player={player}
            />
          ))}
        </div>
      )}
      <Map size={mapSize} />
    </div>
  );
}

export default App;
