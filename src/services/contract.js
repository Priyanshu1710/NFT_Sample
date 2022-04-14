import { CosmWasmClient } from "cosmwasm";
import { organigationName } from '../config/network'
import { contractAddr } from "./keplr";

const configin = {
  chainId: organigationName?.chainId,
  rpcEndpoint: organigationName?.rpc,
  prefix: organigationName?.prefix,
};

const main = async () => {
  const client = await CosmWasmClient.connect(configin.rpcEndpoint);

  const config = await client.queryContractSmart(contractAddr, { "ipfs_list": { "address": localStorage.getItem("ac") } });
  return await config;
}

export default main;