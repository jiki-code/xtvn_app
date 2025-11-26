"use client";

import { Modal, Button, Radio, Input } from "antd";
import Image from "next/image";
import styles from "@/app/dashboard/HomePage.module.css";


export default function AppModal({
  visible,
  type,
  title,
  extraData,
  onOk,
  onCancel,
  breakType,
  breakReason,
  setBreakType,
  setBreakReason,
  handleBreakOk
}) {

  const ModalOkButton = ({ onOk }) => (
    <Button
      className={styles.modalOkButton}
      onClick={onOk}
    >
      Confirm
    </Button>
  );

  const renderContent = () => {
    switch (type) {
      case "checkin":
        return (
          <div className={styles.checkinbtn}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} />
            <h2>Success!</h2>
            <p>You have successfully checked in.</p>
            <ModalOkButton onOk={onOk} />
          </div>
        );
      case "checkoutSuccess":
        return (
          <div className={styles.checkoutSuccessbtn}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} />
            <h2>Success!</h2>
            <p>You have successfully checked out.</p>
            <ModalOkButton onOk={onOk} />
          </div>
        );
      case "break":
        return (
          <div className={styles.break}>
            <Radio.Group
              onChange={(e) => setBreakType && setBreakType(e.target.value)}
              value={breakType}
              className={`${styles.breakradiog}`}
            >
              <Radio value="personal" className="custom-radio">Break</Radio>
              {breakType === "personal" && (
                <Input
                  placeholder="Enter reason"
                  value={breakReason}
                  onChange={(e) => setBreakReason && setBreakReason(e.target.value)}
                  className={`${styles.breakinput}`}
                />
              )}
              <Radio value="toilet" className="custom-radio">Toilet</Radio>
            </Radio.Group>
            <div className={styles.breakok}>
              <ModalOkButton
                onOk={() => {
                  if (!breakType) return;
                  handleBreakOk && handleBreakOk();
                }}
              />
            </div>
          </div>
        );
      case "confirmCheckout":
        return (
          <div className={styles.confirmCheckout}>
            {extraData?.icon && (
              <Image src={extraData.icon} alt="Icon" width={65} height={65} />
            )}
            <div className={styles.confirmCheckoutConfirm}>Confirm</div>
            <div className={styles.confirmCheckoutConfirmt}>
              Are you sure you want to check-out?
            </div>
            <ModalOkButton onOk={onOk} />
          </div>
        );
      case "popup":
        return (
          <div className={styles.popup}>
            <h3 style={{ color: "red" }}>{extraData?.message}</h3>
            {startCounting && <p style={{ color: "#000" }}>Missed time: {missedTime}s</p>}
            <ModalOkButton onOk={onOk} />
          </div>
        );
      case "breakSuccess":
        return (
          <div className={styles.breakSuccess}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} className={`${styles.breakSuccessImg}`} />
            <h2>Success!</h2>
            <p>Your break start time has been saved: {extraData?.startTime?.toLocaleTimeString()}</p>
            <ModalOkButton onOk={onOk} />
          </div>
        );
      case "breakEndSuccess":
        return (
          <div className={styles.breakSuccess}>
            <Image src="/icon/v-icon.png" alt="Success" width={90} height={90} />
            <h2>Success!</h2>
            <p>
              You have successfully ended your {extraData?.breakType || "break"} at:{" "}
              {extraData?.endTime?.toLocaleTimeString()}
            </p>
            <ModalOkButton onOk={onOk} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={visible} title={title} onCancel={onCancel} footer={null} centered>
      {renderContent()}
    </Modal>
  );
}
