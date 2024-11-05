import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useState } from "react";

interface PropsType {
  user: User | null;
}

const handleSignOut = () => {
  signOut(auth)
    .then(() => console.log("Sign Out"))
    .catch((error) => console.log(error));
};

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-5 fixed top-0 right-0 w-full flex justify-between items-center bg-black">
      <Link to="/" className={user ? "" : "w-32"}>
        <img
          src="/logo.png"
          alt="Movie Scout"
          className={user ? "md:w-1/4 w-1/4" : "w-full"}
        />
      </Link>

      <Link to="/Search" className="hidden text-white lg:flex gap-x-2">
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png"
          alt="search--v1"
        />
        <h2>Search</h2>
      </Link>
      {!user && (
        <Link
          to="/authenticate"
          className="hidden text-white lg:inline-block hover:text-opacity-60"
        >
          ログイン
        </Link>
      )}

      {user && (
        <div className="flex gap-5">
          <Link
            to="/my_page"
            className="hidden lg:inline-block text-white hover:text-opacity-60"
          >
            マイページ
          </Link>
          <h2 className="hidden lg:inline-block text-white">
            ユーザー: {user.email}
          </h2>

          <h2
            className="hidden lg:inline-block text-red-500 underline hover:text-red-600 cursor-pointer"
            onClick={handleSignOut}
          >
            ログアウト
          </h2>
        </div>
      )}

      {/* ハンバーガーメニュー */}
      <div className="lg:hidden">
        {!isOpen && (
          <div className="w-10 cursor-pointer" onClick={handleOpen}>
            <img src="https://img.icons8.com/?size=100&id=8113&format=png&color=FFFFFF" />
          </div>
        )}
        {isOpen && (
          <div className="">
            <div className="w-10 cursor-pointer" onClick={handleOpen}>
              <img src="https://img.icons8.com/?size=100&id=8112&format=png&color=FFFFFF" />
            </div>
            <div className="fixed top-28 sm:top-40 right-0 sm:-right-4  bg-blue-900 border border-yellow-400 h-2/4 w-3/4 sm:w-2/4">
              <ul className="p-10 flex flex-col gap-y-5 text-lg">
                <Link to="/">
                  <li className="text-white hover:text-opacity-60">ホーム</li>
                </Link>
                <Link to="/my_page">
                  <li className="text-white hover:text-opacity-60">
                    マイページ
                  </li>
                </Link>
                <Link to="/Search">
                  <li className="text-white hover:text-opacity-60">
                    映画を探す
                  </li>
                </Link>
                {user && <li className="bottom-0">ユーザー: {user.email}</li>}
                {user ? (
                  <li
                    onClick={handleSignOut}
                    className="text-red-500 underline hover:text-red-600 cursor-pointer"
                  >
                    ログアウト
                  </li>
                ) : (
                  <Link to="/authenticate">
                    <li className="text-white hover:text-opacity-60">
                      ログイン
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
