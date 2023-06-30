import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { Reducer } from "./reducer";
import { useRouter } from "next/router";

const Kid = process.env.PAYMENT_ID

export const ContextPro = createContext();
const Context = ({ children }) => {
  const router = useRouter();

  const getDataFromLocal = (key, action) => {
    let data = localStorage.getItem(key);
    try {
      if (data) {
        dispatch({ type: action, payload: JSON.parse(data) });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataFromLocal("siteCart", "SET_CART");
    getDataFromLocal("siteAds", "SET_ADS");
    getDataFromLocal("siteOrders", "SET_ORDER");
  }, []);

  const InitialState = {
    ProductList: [],
    page: 1,
    singleProduct: [],
    Cart: [],
    Favourite: [],
    address: [],
    total_Price: 0,
    shipFee: 4.99,
    Sub_Total: 0,
    Sorting_Value: "",
    FilterTag: {
      text: "",
      category: "",
      brand: "",
      price: 0,
      maxPrice: 0,
      minPrice: 0,
    },
    filter_products: [],
    isAlert: false,
    alertMsg: "",
    alertType: "",
    RecentOrder: [],
    MyOrders: [],
  };
  const [state, dispatch] = useReducer(Reducer, InitialState);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=100`
      );
      // console.log(response)
      dispatch({
        type: "FETCHING_ALL_PRODUCT",
        payload: response.data.products,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchMoreData = () => {
    dispatch({ type: "SET_PAGE", payload: state.page });
  };


  const addObject = (i) => {
    const colors = ["#edeff2", "#374151", "#6366f3"];
    const size = ["SM", "M", "L", "XL"];
    if (
      i.category === "smartphones" ||
      i.category === "laptops" ||
      i.category === "sunglasses" ||
      i.category === "automotive" ||
      i.category === "motorcycle" ||
      i.category === "lighting" ||
      i.category === "home-decoration" ||
      i.category === "furniture"
    ) {
      return { ...i, colors };
    } else if (
      i.category === "tops" ||
      i.category === "womens-dresses" ||
      i.category === "womens-shoes" ||
      i.category === "mens-shirts" ||
      i.category === "mens-shoes" ||
      i.category === "mens-watches" ||
      i.category === "womens-watches" ||
      i.category === "womens-bags" ||
      i.category === "womens-jewellery"
    ) {
      return { ...i, colors, size };
    } else {
      return i;
    }
  };

  const SingleData = async (id) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const updatedSingleProduct = addObject(response.data);
      dispatch({
        type: "FETCHING_SINGLE_PRODUCT",
        payload: updatedSingleProduct,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const filterTag = (e) => {
    let tag = e.target.name;
    let value = e.target.value;
    let isChecked = e.target.checked;

    return dispatch({
      type: "UPDATE_FILTER_VALUE",
      payload: { tag, value, isChecked },
    });
  };

  const uncheckedPrice = () => {
    return dispatch({ type: "UNCHECK_PRICE" });
  };
  const clearFilterTag = () => {
    dispatch({ type: "CLEAR_FILTER_TAG" });
  };
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: state.ProductList });
  }, [state.ProductList]);

  useEffect(() => {
    dispatch({ type: "UPDATE_FILTER_PRODUCTS" });
  }, [state.FilterTag, state.ProductList]);

  const sorting_Value = (e) => {
    let userValue = e.target.dataset.value;
    return dispatch({ type: "SORT_VALUE", payload: userValue });
  };

  useEffect(() => {
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [state.Sorting_Value]);

  const capitalize = (str) => {
    return str?.replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });
  };
  const toggleCart = (e) => {
    const classList = e.current.classList;
    classList.toggle("hidden");
    classList.toggle("block");
  };

  const addToCart = (e) => {
    dispatch({ type: "ADD_TO_CART", payload: e });
    dispatch({
      type: "ALERT",
      payload: { massage: "Item added in Cart", type: "sucess" },
    });
  };

  const removeCart = (e) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: e.id });
    dispatch({
      type: "ALERT",
      payload: { massage: "Item Removed From Cart", type: "danger" },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    dispatch({
      type: "ALERT",
      payload: { massage: "Cart Cleared Successfully", type: "sucess" },
    });
  };
  const addToFav = (e) => {
    const isExist = state.Favourite?.find((item) => item.id === e.id);

    if (isExist) {
      dispatch({ type: "REMOVE_FROM_FAV", payload: e.id });
      dispatch({
        type: "ALERT",
        payload: { massage: "Removed From Favourite List", type: "danger" },
      });
    } else {
      dispatch({ type: "ADD_TO_FAV", payload: e });
      dispatch({
        type: "ALERT",
        payload: {
          massage: "Item Added To Your Favourite List",
          type: "sucess",
        },
      });
    }
  };

  const HandleInc = (e) => {
    dispatch({ type: "INC", payload: e });
  };
  const HandleDec = (e) => {
    dispatch({ type: "DEC", payload: e });
  };

  const setDefault = (i) => {
    dispatch({ type: "SET_DEFAULT", payload: i });
  };
  const DeleteAds = (i) => {
    dispatch({ type: "DEL_ADS", payload: i });
  };
  // const editAds =(i)=>{
  //   dispatch({type: "EDIT_ADS", payload: i})
  // }


  // make payment using razorpay

  const orderSuccess = (e) => {
    let OrderAds = state.address.filter((i) => {
      return i.Default === true;
    });
    // console.log(OrderAds);
    let OrderItem = {
      Order_id: e.razorpay_order_id,
      Payment_id: e.razorpay_payment_id,
      Order_Date: Date.now(),
      Order_address: OrderAds,
      Order_amount: state.Sub_Total,
      fee: state.shipFee,
      item: [...state.Cart],
    };
    dispatch({ type: "TXN_SUCCESS", payload: OrderItem });
  };

  const onScriptLoad = async () => {
    const res = await initiatePayment();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    let orderAmount = Math.round(state.Sub_Total * 10);
    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Sub_Total: orderAmount }),
    }).then((t) => t.json());

    var options = {
      key: Kid,
      name: "Guruji Meals Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for Testing My Website Payment integration system",
      image:
        "https://cdn.telanganatoday.com/wp-content/uploads/2022/12/AI-1.jpg",
      handler: function (response) {
        orderSuccess(response);
        router.push("/recentOrder");
      },
      prefill: {
        name: "Test Drive",
        email: "testdrive@gmail.com",
        contact: "9898525231",
      },
      theme: {
        color: "#9333ea",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initiatePayment = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = () => {
    if (state.address.length === 0) {
      dispatch({
        type: "ALERT",
        payload: {
          massage: "Plz Add a Delivery Address before making an Payment ",
          type: "danger",
        },
      });
    } else {
      onScriptLoad();
    }
  };

  useEffect(() => {
    dispatch({ type: "CART_TOTALS" });
    setTimeout(() => {
      localStorage.setItem("siteCart", JSON.stringify(state.Cart));
    }, 3000);
  }, [state.Cart]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("siteAds", JSON.stringify(state.address));
    }, 1000);
  }, [state.address]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("siteOrders", JSON.stringify(state.MyOrders));
    }, 1000);
  }, [state.MyOrders]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "ALERT_TIMEOUT",
      });
    }, 3000);
  }, [state.alertMsg]);

  // useEffect(() => {
  //   if (state.total_Price > 1000) {
  //     state.shipFee = 0
  //   }
  // }, [state.total_Price])

  return (
    <>
      <ContextPro.Provider
        value={{
          ...state,
          dispatch,
          toggleCart,
          SingleData,
          addToCart,
          addToFav,
          removeCart,
          fetchMoreData,
          clearCart,
          HandleInc,
          HandleDec,
          filterTag,
          clearFilterTag,
          sorting_Value,
          capitalize,
          setDefault,
          DeleteAds,
          uncheckedPrice,
          makePayment,
        }}
      >
        {children}
      </ContextPro.Provider>
    </>
  );
};
export const useGlobalState = () => {
  return useContext(ContextPro);
};

export default Context;
