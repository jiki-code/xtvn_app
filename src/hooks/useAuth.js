import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getUserProfile } from "@/helpers/storeUser";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const dataUser = getUserProfile();

  const finalUser = user?.name ? user : dataUser;

  return { user: finalUser, dispatch };
};