import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { PostProps } from "./PostList";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseApp";
import Loader from "./Loader";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null)
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getPost = async (id: string) => {
    if(id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...docSnap.data() as PostProps });
    }
  };

  //console.log(post);
  const handleDelete = async () => {
    const confirm = window.confirm('해당 게시글을 삭제하시겟습니까?');
    if(confirm && post && post.id) {
     await deleteDoc(doc(db, 'posts', post.id));
     toast.success('게시글을 삭제했습니다. ')
      navigate("/")
    }  
  };

  useEffect(() => {
    if(params?.id) getPost(params?.id);
  }, [params.id]);
  
  // console.log('params',params?.id);

  return <>
    <div className="post__detail">
      {post ? (
         <div className="post__box">
         <div className="post__title">
         {post?.title}
         </div>
         <div className="post__profile-box">
               <div className="post__profile" />
               <div className="post__author-name">{post?.email}</div>
  
             </div>
             
             <div className="post__utils-box">
              {post?.category && (
                  <div className="post__category">{post?.category}</div>
              )}
               <div className="post__delete" role="presentation" onClick={handleDelete}>
                 <Link to={`/posts/delete/${post?.id}`}>삭제</Link>
               </div>
               <div className="post__edit">
                 <Link to={`/posts/edit/${post?.id}`}>수정</Link>
               </div>
             </div>
         <div className='post__text post__text--pre-wrap'>{post?.content}</div>
       </div>
      ) : <Loader />}
     
    </div>
  </> 
}