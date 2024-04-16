import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { db } from "../firebaseApp";
import AuthContext from "../context/AuthContext";

interface PostListProps {
  hasNavigation?: boolean;
}
type TabType = "all" | "my";

export interface PostProps {
  id?: string;
  title: string;
  content: string;
  email: string;
  summary: string;
  createAt: string;
}
export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));
    // console.log('datas',datas)
    datas?.forEach((doc) => {
      // console.log('doc',doc.data(),doc.id);
      const dataObj = {...doc.data(), id: doc.id}
      setPosts((prev) => [...prev, dataObj as PostProps] );
    });
  };

  console.log('합치기',posts);
  useEffect(() => {
   getPosts();
  },[])

  return (
    <>
    { hasNavigation && (  
            <div className='post__navigation'>
            <div role="presentation" 
            onClick={() => setActiveTab("all")}
            className={activeTab === 'all' ? 'post__navigation--active' : ""}>
              전체
            </div> 
            <div role="presentation" 
            onClick={() => setActiveTab("my")}
            className={activeTab === 'my' ? 'post__navigation--active' : ""}>
              나의 글
            </div>
          </div>
    )}
    <div className="post__list">
    {posts?.length > 0 ? posts?.map((posts, index) => (
     <div key={posts.id} className="post__box">
       <Link to={`/posts/${posts?.id}`}>
         <div className="post__profile-box">
           <div className="post__profile" />
           <div className="post__author-name">{posts?.email}</div>
           <div className="post__date"> {posts?.createAt}</div>
         </div>
         <div className="post__title">
            {posts?.title}
         </div>
         <div className='post__text'>
          {posts?.summary}
         </div>
      </Link>
         {posts.email === user?.email && (
             <div className="post__utils-box">
             <div className="post__delete">삭제</div>
             <Link to={`/posts/edit/${posts?.id}`} className="post__edit">수정</Link>
           </div>
         )}
     </div>
    ))
  : <div className="post__no-post">게시글이 없습니다.</div>}
   </div>
   </>
  );
}