import { Link } from "react-router-dom"

export default function PostDetail() {

  return <>
    <div className="post__detail">
      <div className="post__box">
        <div className="post__title">
        What is Lorem Ipsum?
          Lorem Ipsum is simply dummy text of the printing and typesetting 
        </div>
        <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name">패스트 캠퍼스</div>
              <div className="post__date"> 2024.04.08 목요일</div>
            </div>
            <div className="post__title">
              게시글 
            </div>
            <div className="post__utils-box">
              <div className="post__delete">
                <Link to={`/posts/delete/1`}>삭제</Link>
              </div>
              <div className="post__edit">
                <Link to={`/posts/edit/1`}>수정</Link>
              </div>
            </div>
            <div className='post__text'>
            t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

            </div>
      </div>
    </div>
  </> 
}