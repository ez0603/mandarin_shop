import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Header from "../Header/Header";
import UserHeader from "../UserHeader/UserHeader";
import AdminHeader from "../AdminHeader/AdminHeader";
import { getAdminPrincipalRequest, getUserPrincipalRequest } from "../../../apis/api/principal";
import * as s from "./style";

function PageLayout({ children }) {
  const [roleId, setRoleId] = useState(null);
  const token = localStorage.getItem('AccessToken');
  console.log("AccessToken from localStorage:", token);

  const { data: adminData, isLoading: isAdminLoading, isError: isAdminError, refetch: refetchAdmin } = useQuery(
    'getAdminPrincipal',
    () => getAdminPrincipalRequest(token),
    {
      enabled: roleId === null && !!token,
      onSuccess: (data) => {
        if (data.role_id === 1) {
          setRoleId(1);
        }
      },
      onError: () => {
        console.error("Admin principal fetch error");
      }
    }
  );

  const { data: userData, isLoading: isUserLoading, isError: isUserError, refetch: refetchUser } = useQuery(
    'getUserPrincipal',
    () => getUserPrincipalRequest(token),
    {
      enabled: roleId === null && !!token,
      onSuccess: (data) => {
        if (data.role_id === 2) {
          setRoleId(2);
        }
      },
      onError: () => {
        console.error("User principal fetch error");
        refetchAdmin();
      }
    }
  );

  useEffect(() => {
    if (isAdminError && !roleId) {
      refetchUser();
    }
  }, [isAdminError, refetchUser, roleId]);

  const renderHeader = () => {
    if (roleId === 2) {
      return <UserHeader />;
    } else if (roleId === 1) {
      return <AdminHeader />;
    } else {
      return <Header />;
    }
  };

  if (isAdminLoading || isUserLoading) {
    return <div>Loading...</div>;
  }

  if (isAdminError && isUserError) {
    return <div>Error loading data</div>;
  }

  return (
    <div css={s.layout}>
      {renderHeader()}
      {children}
    </div>
  );
}

export default PageLayout;
