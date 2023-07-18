import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function AuthenticatedContainer({ children }) {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (!user) {
      navigate("/");
    }
    setLoading(false);
  }, [user, navigate]);
  // useEffect(
  //   function () {
  //     if (!user && !loading) navigate("/");
  //     setLoading(false);
  //   },
  //   [user, loading, navigate]
  // );

  if (loading) {
    return <Loading height={"100vh"} bg={"#E0E7E9"} loadingSize={80} />;
  }

  if (user) {
    return children;
  }

  return null;
}
