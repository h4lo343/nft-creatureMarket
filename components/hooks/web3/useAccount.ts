

import useSWR from "swr"
import {CryptoHookFactory} from "@_types/hooks";

type AccountHookFactory = CryptoHookFactory<string>

export type UseAccountHook = ReturnType<AccountHookFactory>

// deps -> provider, ethereum, contract (Web3State)
export const hookFactory : AccountHookFactory = ({provider}) => (params) => {
    const swrRes = useSWR(provider? "web3/useAccount" : null, async () => {
        const accounts = await provider!.listAccounts()
        const account = accounts[0]
        return account;
    })



    return swrRes;
}


