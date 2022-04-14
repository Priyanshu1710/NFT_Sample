// import { SigningCosmWasmClient } from "cosmwasm/build/cosmwasm-stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { organigationName } from '../config/network'
import { KeplrWallet, contractAddr } from "./keplr";

const customFees = {
    upload: {
        amount: [{ amount: "2000000", denom: "ucmdx" }],
        gas: "2000000",
    },
    init: {
        amount: [{ amount: "500000", denom: "ucmdx" }],
        gas: "500000",
    },
    exec: {
        amount: [{ amount: "500000", denom: "ucmdx" }],
        gas: "500000",
    },
    send: {
        amount: [{ amount: "80000", denom: "ucmdx" }],
        gas: "80000",
    },
}



const mintTransaction = async (assetName, assetDesc, callback) => {

    const httpUrl = organigationName?.rpc;
    const walletAddress = localStorage.getItem("ac");

    const handleMsg = {
        "mint":
        {
            "owner": walletAddress,
            "creator": walletAddress,
            "name": assetName,
            "description": assetDesc,
            "image": localStorage.getItem('fl'),
        }
    };

    const [offlineSigner, accounts] = await KeplrWallet(organigationName?.chainId);

    const accountFromSigner = (await offlineSigner.getAccounts()).find(
        (account) => account.address === walletAddress,
    );

    await SigningCosmWasmClient.connectWithSigner(
        httpUrl,
        offlineSigner)
        .then((client) => {
            client.signAndBroadcast(
                walletAddress,
                [{
                    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
                    value: {
                        sender: walletAddress,
                        contract: contractAddr,
                        msg: new TextEncoder().encode(JSON.stringify(handleMsg))
                    }
                }],
                customFees.exec
            ).then((response) => {
                console.log(response)
                callback(null, response)
            }).catch((err) => {
                callback(err)
                console.log("err", err);
            })
        }).catch((error) => {
            callback(error)
            console.log("error", error)
        });

    localStorage.removeItem('fl');
}

export const burnTransaction = async (tokenId) => {

    const httpUrl = organigationName?.rpc;
    const walletAddress = localStorage.getItem("ac");

    const handleMsg = {
        "burn":
        {
            "token_id": tokenId,
        }
    };

    const [offlineSigner, accounts] = await KeplrWallet(organigationName?.chainId);

    const accountFromSigner = (await offlineSigner.getAccounts()).find(
        (account) => account.address === walletAddress,
    );

    await SigningCosmWasmClient.connectWithSigner(
        httpUrl,
        offlineSigner)
        .then((client) => {
            client.signAndBroadcast(
                walletAddress,
                [{
                    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
                    value: {
                        sender: walletAddress,
                        contract: contractAddr,
                        msg: new TextEncoder().encode(JSON.stringify(handleMsg))
                    }
                }],
                customFees.exec
            ).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log("err", err);
            })
        }).catch((error) => {
            console.log("error", error)
        });

    localStorage.removeItem('fl');
}
export const transferTransaction = async (userAddress, tokenId) => {

    const httpUrl = organigationName?.rpc;
    const walletAddress = localStorage.getItem("ac");

    const handleMsg = {
        "transfer":
        {
            "recipient": userAddress,
            "token_id": tokenId,

        }
    };

    const [offlineSigner, accounts] = await KeplrWallet(organigationName?.chainId);

    const accountFromSigner = (await offlineSigner.getAccounts()).find(
        (account) => account.address === walletAddress,
    );

    await SigningCosmWasmClient.connectWithSigner(
        httpUrl,
        offlineSigner)
        .then((client) => {
            client.signAndBroadcast(
                walletAddress,
                [{
                    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
                    value: {
                        sender: walletAddress,
                        contract: contractAddr,
                        msg: new TextEncoder().encode(JSON.stringify(handleMsg))
                    }
                }],
                customFees.exec
            ).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log("err", err);
            })
        }).catch((error) => {
            console.log("error", error)
        });

    localStorage.removeItem('fl');
}

export default mintTransaction;