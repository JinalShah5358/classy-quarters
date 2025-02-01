import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const { user, isLoading, isAutheticated } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAutheticated && !isLoading) navigate("/login");
    },
    [isAutheticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  if (isAutheticated) return children;
}

export default ProtectedRoute;
