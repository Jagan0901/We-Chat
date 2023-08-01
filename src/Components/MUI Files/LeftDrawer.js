import {useState} from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

// export default function LeftDrawer() {
//   const [state, setState] = useState({'left':false});

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event &&
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     ></Box>
//   );

//   return (
//     <>
//           <Button onClick={toggleDrawer(anchor, true)}>Left</Button>
//           <SwipeableDrawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//             onOpen={toggleDrawer(anchor, true)}
//           >
//             {/* {list(anchor)} */}
//           </SwipeableDrawer>
//     </>
//   );
// }
