import { configureStore } from '@reduxjs/toolkit';

import userStore from './modules/user';

export default configureStore({
  reducer: {
    userStore,
  },
});
