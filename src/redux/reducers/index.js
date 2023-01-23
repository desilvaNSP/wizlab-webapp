import { combineReducers } from 'redux';

import CommonReducer from './Admin/CommonReducer';
import MerchantReducer from './Admin/MerchantReducer';
import TerminalReducer from './Admin/TerminalReducer';
import TransactionReducer from './Payment/TransactionsReducer';
import AuthenticationReducer from './Auth/Authentication';

export default combineReducers({
     merchants: MerchantReducer,
     terminals: TerminalReducer,
     transactions: TransactionReducer,
     common: CommonReducer,
     auth: AuthenticationReducer
});
