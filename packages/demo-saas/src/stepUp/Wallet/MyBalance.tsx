import React, { useEffect, useState } from 'react';
import { getRandomInt } from './utils';

const MyBalance = () => {
  const [balance, setBalance] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBalance(getRandomInt(1000, 2000));
      setIsLoaded(true);
    });
  }, [setBalance, setIsLoaded]);

  return isLoaded ? (
    <div>
      Your Amazon balance is <b style={{ color: '#1665c0' }}>{balance}</b>!
    </div>
  ) : (
    <>Loading balance</>
  );
};

export default MyBalance;
