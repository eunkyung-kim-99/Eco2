import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { noticeDelete } from "../../../store/admin/noticeSlice";
import { reportAccept } from "../../../store/admin/reportSlice";
import { commentDelete } from "../../../store/post/commentSlice";
import { postDelete, report, reportCancle } from "../../../store/post/postSlice";
import { friendRequest } from "../../../store/user/accountSlice";
import {
  getUserEmail,
  getUserId,
  removeUserSession,
} from "../../../store/user/common";
import { deleteUser, logout } from "../../../store/user/userSettingSlice";
import styles from "./AdminModal.module.css";

const AdminModal = ({
  title,
  content,
  type,
  id,
  postType,
  closeModal
}) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = getUserEmail();

  const sendReportAccept = () => {
      dispatch(reportAccept({ id: id, type: postType })).then((res) => {
        if (res.payload.status === 200) {
          alert("신고 승인되었습니다.");
          navigate("/report");          
        }
      });
  }
  const sendReportCancle = () => {
      dispatch(reportCancle({ id: id, type: postType })).then((res) => {
        if (res.payload.status === 200) {
          alert("신고 반려되었습니다.");
          navigate("/report");          
        }
      });
    
  }
  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
  return (
    <div className={`${displayType} ${styles.modal}`} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalBody}>
        <div className={styles.modalTitle}>
          {type === "승인" ? (
            <i className={`fa-regular fa-circle-check ${styles.editIcon}`}></i>
          ) : type === "반려" ? (
            <i
              className={`fa-solid fa-circle-exclamation ${styles.deleteIcon}`}
            ></i>
          ):{

          }}
          <h2 className={styles.title}>{title}</h2>
        </div>
        <p className={styles.content}>{content}</p>
        <div className={styles.buttonGroup}>
          {type === "승인" ? (
            <button onClick={sendReportAccept} className={`${styles.editButton}`}>
            {type}
          </button>
          ) : (
            <button onClick={sendReportCancle} className={`${styles.warningButton}`}>
              {type}
            </button>
          )}
          <button
            onClick={() => {
              setHidden(true);
              document.body.style = `overflow: auto`;
            }}
            className={`${styles.cancleButton}`}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;