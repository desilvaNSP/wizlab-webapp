import * as ACTIONS from "../../Actions/Types"

const initialState = {
  Merchants: [],
  NetworkProfiles: []
};

const formatResponseForProcess = (networkProfiles) => {
  var returnNetworkProfiles = [];
  networkProfiles.forEach(networkProfile => {
    const MNTT = networkProfile.merchantNetworkTransactionTypes
    if (MNTT.length > 0) {
      networkProfile["typeId"] = MNTT[0].id
      networkProfile["enableTT"] = MNTT[0].id != 0 ? true : false
      networkProfile["transactionTypeId"] = MNTT[0].transactionTypeId
      networkProfile["lowerLimit"] = MNTT[0].lowerLimit
      networkProfile["upperLimit"] = MNTT[0].upperLimit
      networkProfile["swipe2pay"] = MNTT[0].swipe2pay
      MNTT.shift();
      if (MNTT.length > 0 && MNTT.length == 1) {
          MNTT[0]["enableTT"] = MNTT[0].id != 0 ? true : false
      }
      if(MNTT.length> 0){
        networkProfile["subRows"] = MNTT
      }else{
        networkProfile["subRows"] = [{
          "enableTT": false,
          "transactionTypeId": 2,
          "upperLimit": 0,
          "lowerLimit": 0,
          "swipe2pay": true,
          "new":true,
          "newTransactionType": true
        }]
      }
    } else {
      networkProfile["enableTT"] = false
      networkProfile["transactionTypeId"] = 1
      networkProfile["lowerLimit"] = 0
      networkProfile["upperLimit"] = 0
      networkProfile["swipe2pay"] = false
      networkProfile["subRows"] = [{
        "enableTT": false,
        "transactionTypeId": 2,
        "upperLimit": 0,
        "lowerLimit": 0,
        "swipe2pay": true,
        "new":true,
        "newTransactionType": true
      }]
    }
    returnNetworkProfiles.push(networkProfile)
  });
  return returnNetworkProfiles;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GET_ALL_MERCHANTS:
      return {
        ...state,
        Merchants: action.payload
      };
    case ACTIONS.GET_ALL_MERCHANTS_FAILED:
      return {
        ...state
      };
    case ACTIONS.GET_ALL_MERCHANT_NETWORK_PROFILES:
      return {
        ...state,
        NetworkProfiles: formatResponseForProcess(action.payload)
      };
    case ACTIONS.GET_ALL_MERCHANT_NETWORK_PROFILES_FAILED:
      return {
        ...state
      };
    case ACTIONS.DELETE_MERCHANT_NETWORK_PROFILE:
      return {
        ...state,
        NetworkProfiles: [...state.NetworkProfiles.filter((element) => {
          return element.id != action.payload
        })]
      };
    case ACTIONS.DELETE_MERCHANT_NETWORK_PROFILE_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}
