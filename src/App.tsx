import { useState, useEffect } from "react";
import { app } from "./firebaseApp"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./components/Router"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./components/Loader"

function App() {
  const auth = getAuth(app);
  // auth를 체그하기 전에 initialize전 ) 에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);
  // auth의 currentUser가 있으면 authenticated로 변경
  //firebase auth가 인증되었으면 True로 변경해주는 로직 추가
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
         setIsAuthenticated(true);
          const uid = user.uid;
          // ...
        } else {
          setIsAuthenticated(false);
        }
        setInit(true);
      });
    }, [auth])
  return (
    <>
      <ToastContainer />
     {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
   </>

  );
}

export default App;
