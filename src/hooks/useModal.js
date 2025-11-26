// hooks/useModal.js
import { useState } from "react";

export default function useModal() {
  const [modalConfig, setModalConfig] = useState({
    visible: false,
    type: "",
    title: "",
    extraData: null,
    onOk: null,
  });

  const showModal = ({ type, title, extraData, onOk }) => {
    setModalConfig({
      visible: true,
      type,
      title,
      extraData: extraData || null,
      onOk: onOk || null,
    });
  };

  const hideModal = () => {
    setModalConfig((prev) => ({ ...prev, visible: false }));
  };

  return { modalConfig, showModal, hideModal };
}
