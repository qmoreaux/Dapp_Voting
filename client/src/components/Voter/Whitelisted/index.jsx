import useEth from '../../../contexts/EthContext/useEth';

export default function Voter() {
  const {
    state: { contract, accounts, web3 }
  } = useEth();

 
  return (
    <>
      <div>
        You are whitelisted. Congrats !
      </div>
    </>
  );
}
