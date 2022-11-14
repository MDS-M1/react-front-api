import { getCurrentUser } from "../services/Auth.service";

const authHeader = () => {
  const user = getCurrentUser();
  console.log(user?.accessToken);

  if (user && user.accessToken) {
    return {
      Authorization: `Bearer ${user.accessToken}`,
    };
  }
  return {};
};

export default authHeader;
