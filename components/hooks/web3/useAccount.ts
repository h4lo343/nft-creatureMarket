

import useSWR from "swr"
import {CryptoHookFactory} from "@_types/hooks";

type UseAccountResponse = {
    connect : () => void
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>

// deps -> provider, ethereum, contract (Web3State)
export const hookFactory : AccountHookFactory = ({provider, ethereum}) => (params) => {
    const swrRes = useSWR(provider? "web 3/useAccount" : null, async () => {
        const accounts = await provider!.listAccounts()
        const account = accounts[0]

        if(!account) {
            throw "Can not retrieve account to Web3 wallet. Please connect"
        }

        return account;
    }, {
        revalidateOnFocus: false
        }
    )

    const connect = async () => {
        try {
            ethereum?.request({method: "eth_requestAccounts"})
        } catch(e) {
            console.log(e)
        }
    }

    return { ...swrRes, connect }
}


