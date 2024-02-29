import React, { FC, useState } from 'react';
import QPWalletModal from './Wallet/QPWallet';
import LSWalletModal from './Wallet/LSWallet';
import { wrapWithBaseHomePage } from '../BaseHomePage/BaseHomePage';

const HomePage: FC = () => {
  const [balance, setBalance] = useState(2000);

  return (
    <>
      <QPWalletModal />
      <LSWalletModal balance={balance} setBalance={setBalance} />
    </>
  );
};

export default wrapWithBaseHomePage(HomePage);
