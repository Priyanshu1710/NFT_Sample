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



const main = async () => {

    const httpUrl = organigationName?.rpc;
    const walletAddress = localStorage.getItem("ac");

    const handleMsg = {
        "send_market_place":
        {
            "token_id": "101588nft",
            "amount": { "amount": { "amount": localStorage.getItem('pr'), "denom": "ucmdx" } }
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


    //    execute the message
    //    client.execute(walletAddress,contractAddress, handleMsg, customFees.exec)
    //    .then((value) => {
    //     console.log(value);
    //    }).catch((err)=>{
    //        console.log(err);
    //    });
    //    console.log("done execute");
    localStorage.clear('fl');
}

export default main;