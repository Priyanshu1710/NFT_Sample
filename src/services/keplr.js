import { organigationName } from "../config/network";

export const getChainConfig = () => {
  return {
    chainId: organigationName?.chainId,
    chainName: organigationName?.chainName,
    rpc: organigationName?.rpc,
    rest: organigationName?.rest,
    stakeCurrency: {
      coinDenom: organigationName?.coinDenom,
      coinMinimalDenom: organigationName?.coinMinimalDenom,
      coinDecimals: organigationName?.coinDecimals,
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: `${organigationName?.prefix}`,
      bech32PrefixAccPub: `${organigationName?.prefix}pub`,
      bech32PrefixValAddr: `${organigationName?.prefix}valoper`,
      bech32PrefixValPub: `${organigationName?.prefix}valoperpub`,
      bech32PrefixConsAddr: `${organigationName?.prefix}valcons`,
      bech32PrefixConsPub: `${organigationName?.prefix}valconspub`,
    },
    currencies: [
      {
        coinDenom: organigationName?.coinDenom,
        coinMinimalDenom: organigationName?.coinMinimalDenom,
        coinDecimals: organigationName?.coinDecimals,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: organigationName?.coinDenom,
        coinMinimalDenom: organigationName?.coinMinimalDenom,
        coinDecimals: organigationName?.coinDecimals,
      },
    ],
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.04,
    },
  };
};
export const KeplrWallet = async (chainID = organigationName?.chainID) => {
  await window.keplr.enable(chainID);
  const offlineSigner = window.getOfflineSigner(chainID);
  const accounts = await offlineSigner.getAccounts();
  return [offlineSigner, accounts];
};

// export const contractAddr = "organigationName1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh7nad0vhyhtuhw3swhpdzj";
// export const contractAddr = "organigationName1zwv6feuzhy6a9wekh96cd57lsarmqlwxdypdsplw6zhfncqw6ftq4vzyde";
// export const contractAddr = "organigationName1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgszmj79n";
// export const contractAddr = "organigationName1wn625s4jcmvk0szpl85rj5azkfc6suyvf75q6vrddscjdphtve8s6z5fs0";
// export const contractAddr = "organigationName1fventeva948ue0fzhp6xselr522rnqwger9wg7r0g9f4jemsqh6sr8jyc0";
export const contractAddr = "organigationName18yn206ypuxay79gjqv6msvd9t2y49w4fz8q7fyenx5aggj0ua37ql26rat";

export const initializeChain = (callback) => {
  (async () => {
    if (!window.getOfflineSigner || !window.keplr) {
      const error = "Please install keplr extension";
      callback(error);
    } else {
      if (window.keplr.experimentalSuggestChain) {
        try {
          await window.keplr.experimentalSuggestChain(getChainConfig());
          const offlineSigner = window.getOfflineSigner(organigationName?.chainId);
          const accounts = await offlineSigner.getAccounts();
          callback(null, accounts[0]);
        } catch (error) {
          callback(error?.message);
        }
      } else {
        const versionError = "Please use the recent version of keplr extension";
        callback(versionError);
      }
    }
  })();
};
