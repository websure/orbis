import { useContext } from "react";
import StoreContext from "../../stores/rootStore";

const F1 = () => useContext(StoreContext);

const useStore = BaseComponent => {
  const component = props => BaseComponent({ ...F1(), ...props });
  return component;
};

export default useStore;
