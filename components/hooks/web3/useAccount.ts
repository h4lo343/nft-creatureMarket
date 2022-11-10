

import useSWR from "swr"

// deps -> provider, ethereum, contract (Web3State)
export const hookFactory = (deps: any) => (params: any) => {
    const swrRes = useSWR("web3/useAccount", () => {
        console.log(deps)
        console.log(params)
        return "Hello"
    })

    return swrRes;
}

export const useAccount = hookFactory({ethereum: null, provider: null})
