import React, { useEffect, useState } from "react";
import styles from "./PostForm.module.css";
import { useDispatch } from "react-redux";
import { addPost, updatePost } from "../../store/mainFeed/feedSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { ShortGreenBtn } from "../../components/styled";
import { postCreate, postUpdate } from "../../store/post/postSlice";
import { userInformation } from "../../store/user/userSettingSlice";
import { getUserEmail } from "../../store/user/common";

const PostForm = () => {
  const [fileImage, setFileImage] = useState("");
  const [file, setFile] = useState("");
  const [selected, setSelected] = useState("");
  const [editText, setEditText] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.content) {
      setEditText(location.state?.content);
    }
  }, []);
  const saveFileImage = (e) => {
    setFile(e.target.files[0]);
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const deleteFileImage = (e) => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  const dispatch = useDispatch();

  // 글 작성 요청보내기
  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const postCreateDto = {
      content: editText,
      user: {
        id: id,
      },
      mission: {
        id: 1,
      },
    };
    const json = JSON.stringify(postCreateDto);
    const blob = new Blob([json], {
      type: "application/json",
    });

    // formData에 파일과 세부 정보들 append
    formData.append("postImage", file);
    formData.append("postCreateDto", blob);
    if (location.state?.postId) {
      // 글 수정 시 해당 글 상세 페이지로 다시 이동
      dispatch(postUpdate({ postId: location.state?.postId, formData })).then(
        (res) => {
          if (res.payload.status === 200) {
            navigate(`/post/${location.state?.postId}`);
          }
        }
      );
    } else {
      // 새 글 작성 시 이동할 페이지 추가 필요
      dispatch(postCreate({ formData })).then((res) => {});
    }
  };

  // 유저 아이디 가져오기
  useEffect(() => {
    dispatch(userInformation({ email: getUserEmail() })).then((res) => {
      if (res.payload.status === 200) {
        setId(res.payload.user.id);
      }
    });
  }, []);
  return (
    <div>
      <div className={styles.titleGroup}>
        <i className={`fa-brands fa-pagelines ${styles.titleIcon}`}></i>
        <h2 className={styles.title}>인증하기</h2>
      </div>
      <hr className={styles.line} />
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          {fileImage ? (
            <img className={styles.img} alt="sample" src={fileImage} />
          ) : location.state?.img ? (
            <img className={styles.img} alt="sample" src={location.state.img} />
          ) : null}
        </div>
        <div className={styles.fileInputGroup}>
          <input className={styles.fileInput} placeholder="첨부파일" />
          <label htmlFor="file" className={styles.imgLabel}>
            파일찾기
          </label>
          <input
            encType="multipart/form-data"
            type="file"
            id="file"
            name="post_file"
            onChange={saveFileImage}
            className={`${styles.fileInput} ${styles.baseFileInput}`}
          />
          {/* <button onClick={() => deleteFileImage()} className={styles.button}>
            삭제
          </button> */}
        </div>
        <div className={styles.selectBox}>
          <select
            name="category"
            onChange={(e) => {
              setSelected(e.target.value);
            }}
            value={location.state?.category ? location.state?.category : ""}
            className={styles.select}
          >
            <option className={styles.option} value="">
              카테고리 선택
            </option>
            <option className={styles.option} value="do">
              실천하기
            </option>
            <option className={styles.option} value="use">
              사용하기
            </option>
            <option className={styles.option} value="save">
              절약하기
            </option>
            <option className={styles.option} value="buy">
              구매하기
            </option>
            <option className={styles.option} value="recycle">
              재활용하기
            </option>
          </select>
        </div>
        <p className={styles.missionTitle}>미션 제목</p>
        <textarea
          required
          className={styles.content}
          value={editText ? editText : text}
          onChange={(e) => {
            setText(e.target.value);
            setEditText(e.target.value);
          }}
        ></textarea>
        <ShortGreenBtn type="submit">작성</ShortGreenBtn>
      </form>
    </div>
  );
};

export default PostForm;
