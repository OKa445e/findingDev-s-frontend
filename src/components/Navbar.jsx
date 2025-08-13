import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUsers } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUsers());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl normal-case gap-2">
          <img
            src="https://i.pinimg.com/736x/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.jpg"
            className="w-8 h-8"
            alt="Finding Devs Logo"
          />
          Finding Dev's {/* Corrected typo from Dev's */}
        </Link>
      </div>

      <div className="flex-none">
        {user && (
          <div className="flex items-center gap-4">
            <p className="hidden md:block">
              Welcome,{" "}
              <span className="font-bold text-primary">{user.name}</span>
            </p>

            <div className="dropdown dropdown-end">
              {/* This is the avatar that triggers the dropdown */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                {/* The `ring` class adds a colored highlight to the avatar, making it pop. */}
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt="User avatar" src={user.photoUrl} />
                </div>
              </div>

              {/* Dropdown Menu Content */}
              <ul
                tabIndex={0}
                // Added a z-index `z-[1]` to ensure it appears above other content.
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/connects">Connection's</Link>
                </li>
                <li>
                  {/* Using the theme's error color for logout provides a visual cue. */}
                  <a className="text-error font-semibold" onClick={handleClick}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
