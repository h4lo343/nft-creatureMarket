

import useSWR from "swr"
import {CryptoHookFactory} from "@_types/hooks";
import { useEffect } from "react";

type UseAccountResponse = {
    connect : () => void,
    isLoading: boolean,
    isInstalled: boolean
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>

// deps -> provider, ethereum, contract (Web3State)
export const hookFactory : AccountHookFactory = ({provider, ethereum, isLoading}) => (params) => {
    const {data, mutate, isValidating, ...swr} = useSWR(provider? "web 3/useAccount" : null, async () => {
        const accounts = await provider!.listAccounts()
        const account = accounts[0]

        if(!account) {
            throw "Can not retrieve account to Web3 wallet. Please connect"
        }
        return account;
    }, {
        revalidateOnFocus: false,
        shouldRetryOnError: false
        }
    )

    useEffect(() => {
        ethereum?.on("accountsChanged", handleAccountsChanged )
        return () => {
            ethereum?.removeListener("accountsChanged", handleAccountsChanged)
        }
    })

    const handleAccountsChanged = (...args: unknown[]) => {
        const accounts = args[0] as string

        if (accounts.length === 0 ) {
            console.log("Please connect to Web3 Wallet")
        } else if (accounts[0] !== data) {
            mutate()
        }
    }

    const connect = async () => {
        try {
            ethereum?.request({method: "eth_requestAccounts"})
        } catch(e) {
            console.log(e)
        }
    }

    return {
        data,
        mutate,
        ...swr ,
        connect,
        isValidating,
        isLoading: isLoading as boolean,
        isInstalled: ethereum?.isMetaMask || false
    }
}


