export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, cartQuantity: 1 }],
      };

    case "UPDATE_CART":
      return {
        ...state,
        cart: [...state.cart].map((product) =>
          product.id === action.payload.id
            ? { ...product, cartQuantity: action.payload.quantity }
            : product
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: [
          ...state.cart.filter((product) => product.id !== action.payload.id),
        ],
      };

    case "CHECKOUT":
      return {
        cart: [],
        checkout: true,
      };

    default:
      return state;
  }
}
