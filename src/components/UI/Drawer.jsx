import ReactDOM from "react-dom";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Drawer.module.scss";
import { useRef } from "react";
import { useContext } from "react";
import drawerContext from "../../store/drawer-context";

const transitionHandler = (ref, isOpen) => {
  if (ref) {
    ref.classList.add(styles["is-transitioning"]);
    if (isOpen) {
      setTimeout(() => {
        ref.classList.add(styles["is-open"]);
        return;
      });
    } else {
      ref.classList.remove(styles["is-open"]);
      setTimeout(() => {
        ref.classList.remove(styles["is-transitioning"]);
      }, 400);
    }
  }
};

const Backdrop = () => {
  const drawerCtx = useContext(drawerContext);
  const backdropRef = useRef();
  transitionHandler(backdropRef.current, drawerCtx.drawerIsOpen);
  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={drawerCtx.toggleDrawer}></div>
  );
};

const DrawerOverlay = (props) => {
  const drawerCtx = useContext(drawerContext);
  const overlayRef = useRef();
  if (drawerCtx.drawerIsOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
  transitionHandler(overlayRef.current, drawerCtx.drawerIsOpen);
  return (
    <div ref={overlayRef} className={styles.drawer} onClick={(e) => {e.stopPropagation(); e.nativeEvent.stopImmediatePropagation()}}>
      <div className={styles["drawer-header"]}>
        <h2 className={styles["drawer-title"]}>
          {drawerCtx.drawerType.toUpperCase()}
        </h2>

        <IconButton onClick={drawerCtx.toggleDrawer} className={styles.close}>
          <CloseIcon />
        </IconButton>
      </div>
      <div
        className={styles["drawer-content"]}
        onClick={drawerCtx.toggleDrawer}>
        {props.children}
      </div>
    </div>
  );
};

const Drawer = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <DrawerOverlay>{props.children}</DrawerOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Drawer;
