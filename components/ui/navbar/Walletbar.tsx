import { FC } from "react";

type WalletbarProps = {
    isLoading: boolean,
    isInstalled: boolean,
    account: string | undefined,
    connect: () => void
}

const Walletbar : FC<WalletbarProps> = ({
    isInstalled,
    isLoading,
    connect,
    account
                                        }) => {

    console.log(isLoading)
    console.log(isInstalled)

    return (
         <>
             <button
                 onClick={() => {
                     connect();
                 }}
                 type="button"
                 className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             >
                 Connect Wallet
             </button>
         </>
     )
}

export default Walletbar
