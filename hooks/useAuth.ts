import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const useAuth = () => {
  const { data, status } = useSession();

  const loggedIn = useMemo(() => status === 'authenticated', [status]);

  /* TODO: Find a solution that is not so hacky for authenticating admins */
  const isAdmin = useMemo(
    // @ts-ignore
    () => status === 'authenticated' && data?.user?.isAdmin,
    // @ts-ignore
    [data?.user?.isAdmin, status]
  );

  const returnData = useMemo(
    () => ({ session: data, status, loggedIn, isAdmin }),
    [data, isAdmin, loggedIn, status]
  );

  return returnData;
};

export const useAdminGuard = () => {
  const { replace } = useRouter();
  const { isAdmin, status } = useAuth();
  useEffect(() => {
    if (!isAdmin && status !== 'loading') {
      replace('/partners');
    }
  }, [isAdmin, replace, status]);
};

export const useLogedInGuard = () => {
  const { replace } = useRouter();
  const { loggedIn, status } = useAuth();
  useEffect(() => {
    if (!loggedIn && status !== 'loading') {
      replace('/partners');
    }
  }, [loggedIn, replace, status]);
};
