import {productIndexReq} from '../spree/api';

const INDEX = 'products/INDEX';

const initState = {
  products: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case INDEX: {
      return {
        ...state,
        products: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;

export const index = (payload) => ({
  type: INDEX,
  payload,
});

export const productsIndex = () => {
  return async (dispatch, _getState) => {
    const products = await productIndexReq();
    dispatch(index(products));
  };
};
