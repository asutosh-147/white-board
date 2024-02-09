import React, { useState } from "react";
import { MdCopyAll } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CheckedToast from "./CheckedToast";
import { motion, AnimatePresence } from "framer-motion";
const RoomIdCard = ({ RoomId }) => {
  const [visible, setVisible] = useState(false);
  const handleCopy = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
  return (
    <>
      <div className="fixed top-2 right-10 ">
        <div className="w-28">
          <p className="text-sm font-semibold">Room Id :</p>
          <div className="flex justify-around items-center gap-5 drop-shadow-xl bg-slate-200 p-4 rounded-lg mb-10">
            <p id="room-id" className="font-bold text-lg">
              {RoomId}
            </p>
            <button className="text-xl rounded-lg hover:shadow-xl bg-gray-100 text-blue-800">
              <CopyToClipboard text={RoomId} onCopy={handleCopy}>
                <MdCopyAll />
              </CopyToClipboard>
            </button>
          </div>
        </div>
      </div>
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ x: 450,opacity:0 }}
              animate={{ x: 0,opacity:1 }}
              exit={{ x: 450 }}
              className="fixed top-28 right-10"
            >
              <CheckedToast text={"Copied Successfully"} setVisible={setVisible} />
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
};

export default RoomIdCard;
