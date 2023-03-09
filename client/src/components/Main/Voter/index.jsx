import Whitelisted from './Whitelisted';
import NotWhitelisted from './NotWhitelisted';

export default function Voter({ whitelist }) {
  return (
    <>
      <div className="card">{whitelist ? <Whitelisted /> : <NotWhitelisted />}</div>
    </>
  );
}
