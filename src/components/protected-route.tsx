import { FC } from "react";
import { useSelector } from "../hooks/redux";
import { useLocation, Navigate } from "react-router-dom";
import { getAuth } from "../services/selectors";

type TProps = {
  element: React.ReactElement;
  anonymous?: boolean;
};

const ProtectedRoute: FC<TProps> = ({ element, anonymous }) => {
  const { userLoggedIn } = useSelector(getAuth);
  const location = useLocation();

  const from = location.state?.from || "/";

  if (anonymous && userLoggedIn) {
    return <Navigate to={from} />;
  }
  if (!anonymous && !userLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
