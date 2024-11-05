import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { addUser } from "../firebase";
import { useNavigate } from "react-router-dom";

export const Authenticate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const handleMethodChange = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addUser(user);
        console.log(user);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignIn = () => {
    // if (!email || !password) {
    //   //ここが表示されない！！次回、ここを修正する！
    //   alert("Email or Password is incorrect. Try again.");
    //   console.log("Email or Password is incorrect. Try again.");

    //   return;
    // }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Email or Password is incorrect. Try again.");
        console.log(errorCode, errorMessage);
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-blue-950">
        <h1 className="text-white text-center text-4xl p-10 font-cinzel">
          Movie Scout
        </h1>
        <div className="w-3/4 h-1/2 rounded-md bg-blue-950 shadow-2xl shadow-yellow-500 flex flex-col justify-center items-center lg:w-1/4">
          {isSignIn && (
            <h1 className="text-3xl mt-8 text-center font-semibold">Sign In</h1>
          )}
          {!isSignIn && (
            <h1 className="text-3xl mt-8 text-center font-semibold">Sign Up</h1>
          )}

          <div className="flex flex-col justify-center items-center gap-5 h-full">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="text"
                className="border-2 text-lg text-black"
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                className="border-2 text-lg text-black"
                onChange={handlePasswordChange}
              />
            </div>
            {isSignIn && (
              <button
                type="button"
                onClick={handleSignIn}
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg rounded-md py-3 px-5 mt-3"
              >
                Sign In
              </button>
            )}
            {!isSignIn && (
              <button
                onClick={handleSignUp}
                type="button"
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg rounded-md py-3 px-5 mt-3"
              >
                Sign Up
              </button>
            )}
          </div>
          {isSignIn && (
            <p className="p-3">
              アカウントをお持ちでない方は、こちらから
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={handleMethodChange}
              >
                サインアップ
              </span>
            </p>
          )}
          {!isSignIn && (
            <p className="p-3">
              すでにアカウントをお持ちの方は、こちらから
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={handleMethodChange}
              >
                サインイン
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};
