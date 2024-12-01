import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let existingItemIndex;
  let updatedItems;
  let newTotalAmount;
  let filteredItems;

  switch (action.type) {
    case "ADD_TO_CART":
      existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        updatedItems = state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        newTotalAmount = updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        return {
          ...state,
          cartItems: updatedItems,
          totalQuantity: state.totalQuantity + 1,
          totalAmount: newTotalAmount,
        };
      }

      newTotalAmount = state.totalAmount + action.payload.price;

      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        totalQuantity: state.totalQuantity + 1,
        totalAmount: newTotalAmount,
      };

    case "REMOVE_FROM_CART":
      filteredItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      newTotalAmount = filteredItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...state,
        cartItems: filteredItems,
        totalQuantity: filteredItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
        totalAmount: newTotalAmount,
      };

    case "UPDATE_QUANTITY":
      updatedItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      return {
        ...state,
        cartItems: updatedItems,
        totalQuantity: updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
        totalAmount: updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
        totalQuantity: 0,
        totalAmount: 0,
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ ...state, dispatch, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
