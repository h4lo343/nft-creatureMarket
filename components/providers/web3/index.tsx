import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import {createDefaultState, createWeb3State, loadContract, Web3State} from "@providers/web3/utils";
import { ethers } from "ethers"
import { MetaMaskInpageProvider } from "@metamask/providers";

function pageReload() {
     location.reload()
}

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
   const isLocked = !( await ethereum._metamask.isUnlocked())
   if (isLocked) { pageReload(); }
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum.on("chainChanged", pageReload)
    ethereum.on("accountsChanged", handleAccount(window.ethereum))
}


const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum?.removeListener("chainChanged", pageReload)
    ethereum?.removeListener("accountsChanged", handleAccount)
}

const Web3Context = createContext<Web3State>(createDefaultState());

interface PropsType {
    children: ReactNode
}

const Web3Provider : FC<PropsType> = ({children}) => {
    const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())

    useEffect(() => {
        async function initWeb3 () {

            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                const contract = await loadContract("NftMarket", provider)
                setGlobalListeners(window.ethereum)

                setWeb3Api(createWeb3State({
                    ethereum: window.ethereum,
                    provider,
                    contract,
                    isLoading: false
                }))
            }
            catch (e:any) {
                console.error("Please install a Web3 wallet")
                setWeb3Api((api) => createWeb3State({
                    ...api as any,
                    isLoading: false
                }))
            }
        }
        initWeb3()
        return removeGlobalListeners(window.ethereum)
    }, []);

    return (
        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    )
}
// update 1
// update 2
// update 3
// update changelog
// fix bug 1
// fix bug 2
// fix bug 3
export function useWeb3() {
    return useContext(Web3Context);
}

export function useHook() {
    const { hooks } = useWeb3();
    return hooks
}

export default Web3Provider

