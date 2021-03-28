import { InjectedConnector } from '@web3-react/injected-connector';
import { TorusConnector } from '@web3-react/torus-connector';

export const injected = new InjectedConnector({
    supportedChainIds: [137],
});

export const torus = new TorusConnector({ chainId: 137 });
