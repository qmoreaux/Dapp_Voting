import React from 'react';

import useEth from '../../contexts/EthContext/useEth';

export default function Voter() {
  const {
    state: { contract, accounts, web3 }
  } = useEth();

  return (
    <>
      <div>TODO</div>
    </>
  );
}
