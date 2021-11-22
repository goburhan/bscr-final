import { DelegateNetwork, DelegateFarmConfig } from './types';

const DelegateFarms : DelegateFarmConfig[] = [
 {
     pid : 38, // pool id si
     tokenSymbol : 'STEEM POWER',
     delegateToken : DelegateNetwork.STEEM,
     isActive : true,
     lpSymbol : 'STEEM POWER',
     depositFee : 50,
     delegateAddress : 'robiniaswap',
     multiplier : '25x'
 }
];

export default DelegateFarms;
