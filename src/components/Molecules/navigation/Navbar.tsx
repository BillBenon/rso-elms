/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Tooltip } from 'recharts';

import useAuthenticator from '../../../hooks/useAuthenticator';
import useNonPickedRole from '../../../hooks/useNonPickedRole';
import usePickedRole from '../../../hooks/usePickedRole';
import { queryClient } from '../../../plugins/react-query';
import { authenticatorStore } from '../../../store/administration';
import academyStore from '../../../store/administration/academy.store';
import { institutionStore } from '../../../store/administration/institution.store';
import { getAllNotifications } from '../../../store/administration/notification.store';
import { Privileges, RoleType } from '../../../types';
import { NotificationStatus } from '../../../types/services/notification.types';
import cookie from '../../../utils/cookie';
import { usePicture } from '../../../utils/file-util';
import Permission from '../../Atoms/auth/Permission';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';

interface Iprops {
  hasProfile?: boolean;
  hasSetting?: boolean;
  hasChangePassword?: boolean;
}

export default function Navbar({
  hasProfile = true,
  hasChangePassword = true,
  hasSetting = true,
}: Iprops) {
  const history = useHistory();

  const [menu, setmenu] = useState({
    isShowNotification: false,
    isShowProfile: true,
    isShowSetting: false,
  });

  const logoutFn = authenticatorStore.logout();
  const { user } = useAuthenticator();

  const location = useLocation();
  const notifications =
    getAllNotifications(user?.id.toString() || '').data?.data.data || [];

  const institution = institutionStore.getAll().data?.data.data;
  const academy_info = academyStore.fetchAcademies().data?.data.data;

  const user_role = usePickedRole();
  const user_privileges = user_role?.role_privileges?.map((role) => role.name);
  const hasPrivilege = (privilege: Privileges) => user_privileges?.includes(privilege);

  const hasSomeUnreadNotifications = notifications.some(
    (notification) =>
      notification.notifaction_status === NotificationStatus.UNREAD.toString(),
  );

  function logout() {
    let toastId = toast.loading('Signing you out ...');
    logoutFn
      .refetch()
      .then(() => {
        queryClient.clear();
        cookie.eraseCookie('jwt_info');
        cookie.eraseCookie('user_role');
        history.push('/login');
        toast.success('You are now logged out.', { id: toastId });
      })
      .catch(() => toast.error('Signout failed. try again latter.', { id: toastId }));
  }

  const picked_role = usePickedRole();
  const other_user_roles = useNonPickedRole();

  const handleMenuState = (state: string) => {
    setmenu({
      isShowNotification: false,
      isShowProfile: false,
      isShowSetting: false,
      //   @ts-ignore
      [state]: !menu[state],
    });
  };

  return (
    <div>
      <div className="text-main bg-[url('/images/logo.png')] bg-[#B8B351] bg-no-repeat bg-left-2 bg-contain">
        <div className="icons flex items-center justify-end px-8">
          <Permission privilege={Privileges.CAN_MODIFY_INSTITUTION}>
            <div className="px-12">
              <Link to={`/dashboard/institution/edit`}>
                <Button styleType="outline">Edit institution</Button>
              </Link>
            </div>
          </Permission>

          <Icon fill="main" name="switch" />

          <Icon fill="main" name="settings" />

          <Icon fill="main" name="notification" />
          <div className="ml-3 relative">
            {/* profile picture */}
            <div>
              <button
                type="button"
                className="bg-gray-800 flex text-sm rounded-full focus:outline-none ring ring-white"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => handleMenuState('isShowProfile')}>
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={usePicture(user?.profile_attachment_id, user?.id)}
                  // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
            {/*Dropdown menu*/}
            <div
              className={`${
                menu.isShowProfile ? '' : 'hidden'
              } transition ease-out duration-100 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none
              `}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button">
              {hasChangePassword && (
                <Link
                  to={`/dashboard/account/update-password`}
                  className="block px-4 py-2 text-sm text-txt-primary hover:bg-gray-100">
                  Change password
                </Link>
              )}
              {hasProfile &&
                (hasPrivilege(Privileges.CAN_ACCESS_USERS_ROLES) ||
                  hasPrivilege(Privileges.CAN_ACCESS_USERS_RANKS) ||
                  hasPrivilege(Privileges.CAN_ACCESS_USERS_NEXTOFKIN) ||
                  hasPrivilege(Privileges.CAN_ACCESS_USERS_PERSONAL_INFO) ||
                  hasPrivilege(Privileges.CAN_ACCESS_PROFILE)) && (
                  <Link
                    to={`/dashboard/user/${user?.id}/profile?me=true`}
                    className="block px-4 py-2 text-sm text-txt-primary hover:bg-gray-100">
                    Your Profile
                  </Link>
                )}
              {hasSetting && (
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-txt-primary hover:bg-gray-100"
                  role="menuitem">
                  Settings
                </Link>
              )}
              <button
                disabled={logoutFn.isLoading}
                onClick={() => logout()}
                className="block px-4 box-border text-left py-2 text-sm text-txt-primary hover:bg-gray-100 w-full"
                role="menuitem">
                {logoutFn.isLoading ? 'Signing out ....' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-success-600 min-h-10 text-gray-200">
        <p className="uppercase text-sm py-3 w-60 text-center">
          {user?.academy?.name || user?.institution_name}
        </p>
      </div>
    </div>
  );
}
