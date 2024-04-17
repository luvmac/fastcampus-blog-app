import { collection, getDocs, deleteDoc, doc, query, orderBy, getDoc, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { db } from "../firebaseApp";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab? : TabType | CategoryType;
}


export interface PostProps {
  id?: string;
  title: string;
  content: string;
  email: string;
  summary: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category?: CategoryType

}

type TabType = "all" | "my" | "category";

export type CategoryType = "Front" | "Back" | "Native" |"Web";

export const CATEGORIES: CategoryType[] = [
    "Front",
    "Back", 
    "Native",
    "Web"
];

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
 
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
   
    setPosts([]);
    let postRef = collection(db, "posts" );
    let postQuery

    if(activeTab === 'my' && user) {
      // 나의 글만 필터링
      postQuery = query(postRef, where('uid', '==', user?.uid), orderBy('createdAt', "asc"))
    } else if (activeTab === 'all') {
      // 모든 글 보여주기
      postQuery = query(postRef, orderBy('createdAt', "asc"));
    } else {
      postQuery = query(postRef, where("category", "==", activeTab),
       orderBy('createdAt', "asc"));
    }

    const datas = await getDocs(postQuery);
    // console.log('datas',datas)
    datas?.forEach((doc) => {
      // console.log('doc',doc.data(),doc.id);
      const dataObj = {...doc.data(), id: doc.id}
      setPosts((prev) => [...prev, dataObj as PostProps] );
    });
  };

  // console.log('합치기',posts);
  

  const handleDelete = async(id: string) => {
    const confirm = window.confirm('해당 게시글을 삭제하시겟습니까?');
    if(confirm && id) {
      await deleteDoc(doc(db, 'posts', id));
      toast.success('삭제완료');
      getPosts()//변경된 postlist를 다시 가져옴s
    }
  };
    useEffect(() => {
      getPosts();
    },[activeTab]);
    
    // console.log(posts)

  return (
    <>
    { hasNavigation && (  
            <div className='post__navigation'>
            <div role="presentation" 
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}>
              전체
            </div> 
            <div role="presentation" 
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}>
              나의 글
            </div>
            {CATEGORIES?.map((category) => (
               <div 
               role="presentation"
               key={category} 
               onClick={() => setActiveTab(category)}
               className={
                activeTab === category ? "post__navigation--active" : ""
                }
              >
                {category}
              </div>
            ))}
          </div>
    )}

    <div className="post__list">
      
    {posts?.length > 0 ? (
      posts?.map((post) => (
     <div key={post?.id} className="post__box">
       <Link to={`/posts/${post?.id}`}>
         <div className="post__profile-box">
           <div className="post__profile" />
           <div className="post__author-name">{post?.email}</div>
           <div className="post__date"> {post?.createdAt}</div>
         </div>
         <div className="post__title">
            {post?.title}
         </div>
         <div className='post__text'>
          {post?.summary}
         </div>
      </Link>
         {post?.email === user?.email && (
             <div className="post__utils-box">
             <div className="post__delete"
             role="presentation"
             onClick={() => handleDelete(post.id as string)}>삭제</div>
             <Link to={`/posts/edit/${post?.id}`} className="post__edit">수정</Link>
           </div>
         )}
     </div>
    ))
  ) : ( 
      <div className="post__no-post">게시글이 없습니다.</div>
    )}
   </div>
   </>
  );
}