import { useState } from "react";
import DetailC from "./DetailC";

const EntityC = ({ kanchri }) =>
{
  const [show, setShow] = useState(false);
  const handleShow = () =>
  {
    setShow(!show);
  }

  // true, shown
  const widget = show ? <div><div>
    <span>{kanchri.name} </span><button onClick={handleShow}>hide</button></div>
    <DetailC kanchri={kanchri} />
  </div> :
    <div><div><span>{kanchri.name} </span><button onClick={handleShow}>show</button></div></div>; // false, not showing
  return widget;
}

export default EntityC;
