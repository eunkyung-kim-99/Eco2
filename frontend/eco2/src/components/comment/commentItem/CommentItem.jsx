import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CommentForm from "../commentForm/CommentForm";
import ReplyList from "../replyList/ReplyList";
import ReportModal from "../../modal/reportModal/ReportModal";
import styles from "./CommentItem.module.css";
import { getUserId, getUserName } from "../../../store/user/common";
import PostModal from "../../modal/postModal/PostModal";
import { useNavigate } from "react-router-dom";

const CommentItem = ({ id, commentUserId, content, user, postId, commentId, replys, setTest, userEmail, registTime }) => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const displayType = modalType ? styles.visible : styles.hidden;
  const navigate = useNavigate();

  useEffect(() => {
    setName(getUserName());
    setUserId(getUserId());
  }, []);

  return (
    <div>
      {!visible && (
        <div className={styles.commentContainer}>
          <div className={styles.comment}>
            <div
              className={styles.userInfo}
              onClick={() =>
                navigate(`/profile/${commentUserId}`, {
                  state: { userEmail },
                })
              }
            >
              <img src={`${process.env.REACT_APP_BE_HOST}img/profile/${commentUserId}`} alt="profileImg" className={styles.profileImg} />
              <p className={styles.user}>{user}</p>
            </div>
            <div>
              <p className={styles.content}>{content}</p>
              <p className={styles.registTime}>{registTime.split("T")[0]}</p>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => {
                setReplyVisible(!replyVisible);
              }}
              className={styles.replyButton}
            >
              ??????
            </button>
            <div className={styles.dropdown}>
              <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
              <div className={styles.dropdownContent}>
                {name === user ? (
                  <div>
                    <button
                      onClick={() => {
                        setVisible(!visible);
                      }}
                      className={styles.dropdownItem}
                    >
                      ??????
                      <i className={`fa-solid fa-pencil ${styles.dropdownIcon}`}></i>
                    </button>
                    <button
                      onClick={() => {
                        setModalVisible(!modalVisible);
                        setModalType("??????");
                      }}
                      className={styles.dropdownItem}
                    >
                      ??????
                      <i className={`fa-solid fa-trash-can ${styles.dropdownIcon}`}></i>
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        setReportModalVisible(!reportModalVisible);
                        setModalType("??????");
                      }}
                      className={styles.dropdownItem}
                    >
                      {" "}
                      ??????
                      <i className={`fa-solid fa-circle-exclamation ${styles.dropdownIcon}`}></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {reportModalVisible && modalType === "??????" && (
        <ReportModal
          className={`${displayType}`}
          title={"?????? ??????"}
          content={"?????? ?????? ?????????????????????????"}
          type="??????"
          commentId={commentId}
          closeModal={() => setReportModalVisible(!reportModalVisible)}
        />
      )}
      {modalVisible && modalType === "??????" && (
        <PostModal
          className={`${displayType}`}
          title={"?????? ??????"}
          content={"????????? ????????????????????????"}
          type={"??????"}
          postId={postId}
          commentId={commentId}
          setTest={setTest}
          closeModal={() => setModalVisible(!modalVisible)}
        />
      )}

      {visible && (
        <div className={styles.editFormGroup}>
          <div
            className={styles.userInfo}
            onClick={() =>
              navigate(`/profile/${commentUserId}`, {
                state: { userEmail },
              })
            }
          >
            <img src={`${process.env.REACT_APP_BE_HOST}img/profile/${commentUserId}`} alt="profileImg" className={styles.profileImg} />
            <p className={styles.user}>{user}</p>
          </div>
          <div className={styles.editForm}>
            <CommentForm userId={userId} postId={postId} id={id} content={content} setTest={setTest} closeModal={() => setVisible(!visible)} />
          </div>
        </div>
      )}
      {replyVisible && (
        <CommentForm userId={userId} postId={postId} id={id} replyVisible={replyVisible} setTest={setTest} closeModal={() => setReplyVisible(!replyVisible)} />
      )}

      <ReplyList commentId={commentId} id={id} replys={replys} commentUserId={commentUserId} setTest={setTest} />
    </div>
  );
};

export default CommentItem;
