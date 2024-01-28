import "./Modal.css";
import React, { useRef, useEffect, useContext, useCallback } from "react";
import cx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { RemoveScroll } from "react-remove-scroll";
import { MdClose } from "react-icons/md";
import { ThemeContext } from "store/theme-provider";
import { helperToast } from "lib/helperToast";
import { Trans } from "@lingui/macro";

export default function Modal(props) {
  const { isVisible, setIsVisible, className, zIndex, onAfterOpen, canClose } = props;

  const modalRef = useRef(null);

  useEffect(() => {
    function close(e) {
      if (e.keyCode === 27 && setIsVisible && canClose) {
        setIsVisible(false);
      }
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [canClose, setIsVisible]);

  useEffect(() => {
    if (typeof onAfterOpen === "function") onAfterOpen();
  }, [onAfterOpen]);

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleModalClose = useCallback(() => {
    if(canClose) { 
      setIsVisible(false); 
    } else {
      helperToast.error(
        <div>
          <Trans>Please accept the terms and conditions.</Trans>
        </div>
      );
    }
    
  }, [canClose, setIsVisible]);

  const themeContext = useContext(ThemeContext);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cx("Modal", className)}
          id={themeContext.theme}
          style={{ zIndex }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeVariants}
          transition={{ duration: 0.2 }}
        >
          <div
            className="Modal-backdrop"
            style={{
              overflow: isVisible ? "hidden" : "visible",
              position: "fixed",
            }}
            onClick={() => setIsVisible(false)}
          ></div>
          <div className={`Modal-content`}>
            <div className="Modal-header-wrapper">
              <div className="Modal-title-bar">
                <div className="Modal-title">{props.label}</div>
                <div className="Modal-close-button" onClick={handleModalClose}>
                  <MdClose fontSize={20} className="Modal-close-icon" />
                </div>
              </div>
              {props.headerContent && props.headerContent()}
            </div>
            <div className="divider" />
            <RemoveScroll>
              <div className={cx("Modal-body")} ref={modalRef}>
                {props.children}
              </div>
            </RemoveScroll>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
