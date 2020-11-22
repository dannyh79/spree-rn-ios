const INDEX = 'products/INDEX';

const initState = {
  products: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case INDEX: {
      return {
        ...state,
        products: state.products,
      };
    }
    default:
      return state;
  }
};

export default reducer;

export const index = () => ({type: INDEX});
