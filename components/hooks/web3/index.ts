import {useHook} from "@providers/web3";


export const useAccount = () => {
    const hooks = useHook()
    const swrRes = hooks.useAccount();
    return {
        account: swrRes
    }
}

export const useNetwork = () => {
    const hooks = useHook()
    const swrRes = hooks.useNetwork()

    return {
        network: swrRes
    }
}
