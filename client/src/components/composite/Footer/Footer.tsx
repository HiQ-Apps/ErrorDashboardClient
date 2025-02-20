import { useSelector, useDispatch } from "react-redux";
import { PiBugBeetleFill } from "react-icons/pi";

import {
  openModal,
  closeModal,
  selectIsOpen,
  selectModalType,
} from "features/modalSlice";
import { selectIsAuthenticated } from "features/authSlice";
import { TimezoneSelector, FooterMenu } from "components/composite";
import { Tooltip, TooltipTrigger, TooltipContent } from "components/ui/tooltip";
import { BaseButton, Clock, Modal } from "components/base";
import CreateBugReportForm from "forms/CreateBugReportForm";

const Footer = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isOpen = useSelector(selectIsOpen);
  const modalType = useSelector(selectModalType);

  const handleBugReportModalClick = () => {
    dispatch(
      openModal({
        modalType: "bugReport",
      })
    );
  };

  const handleCloseModalClick = () => {
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-row justify-between p-2 text-slate-600 bg-slate-100 min-w-full fixed bottom-0 text-md text-right dark:bg-slate-900 dark:text-slate-300">
      <div className="flex flex-row space-x-4 items-center justify-center">
        <BaseButton
          content={<PiBugBeetleFill />}
          onClick={() => {
            handleBugReportModalClick();
            closeModal();
          }}
          overrideStyles="p-2"
          variant="navbutton"
        />
        {isAuthenticated ? <FooterMenu /> : <></>}
      </div>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-row align-center justify-center items-center">
          <TimezoneSelector />
        </div>
        <Clock />
        <Modal
          header="Bug Report"
          content={<CreateBugReportForm />}
          open={isOpen && modalType === "bugReport"}
          onClose={handleCloseModalClick}
          showConfirmButtons={false}
        />
      </div>
    </div>
  );
};

export default Footer;
