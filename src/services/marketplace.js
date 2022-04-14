import { CosmWasmClient } from "cosmwasm";
import { organigationName } from '../config/network'
import { contractAddr } from "./keplr";

const configin = {
  chainId: organigationName?.chainId,
  rpcEndpoint: organigationName?.rpc,
  prefix: organigationName?.prefix,
};

const market = async () => {
  const client = await CosmWasmClient.connect(configin.rpcEndpoint);

  const config = await client.queryContractSmart(contractAddr, { "all_nft_marketplace": {} });
  return await config;
}

export default market;