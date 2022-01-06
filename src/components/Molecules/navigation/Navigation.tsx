/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { queryClient } from '../../../plugins/react-query';
import { authenticatorStore } from '../../../store/administration';
// import { ValueType } from '../../../types';
import { UserInfo, UserType } from '../../../types/services/user.types';
import cookie from '../../../utils/cookie';
import Avatar from '../../Atoms/custom/Avatar';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
// import SearchMolecule from '../input/SearchMolecule';

export default function Navigation() {
  const history = useHistory();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [authUser, setAuthUser] = useState<UserInfo>();
  const logoutFn = authenticatorStore.logout();
  const { data } = authenticatorStore.authUser();

  const location = useLocation();

  useEffect(() => {
    setAuthUser(data?.data.data);
    if (authUser?.user_type === UserType.SUPER_ADMIN && !authUser.institution_id) {
      history.push('/institution/new');
    }
  }, [data?.data.data]);

  const links = [
    { text: 'Home', to: '/' },
    { text: 'About', to: '/about' },
  ];

  const activeClass = 'text-white bg-gray-900';
  const inactiveClass = 'text-gray-300 hover:text-white hover:bg-gray-700';

  //  function handleSearch(_e: ValueType) {}

  function logout() {
    let toastId = toast.loading('Signing you out ...');
    logoutFn
      .refetch()
      .then(() => {
        queryClient.clear();
        cookie.eraseCookie('jwt_info');
        history.push('/login');
        toast.success('You are now logged out.', { id: toastId });
      })
      .catch(() => toast.error('Signout failed. try again latter.', { id: toastId }));
  }
  return (
    <nav className="bg-main">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-24">
          {/* Disabled Global search just for the while its not functioning css will be justify-center 
          will replace justify-endwhen the search is added in this div */}
          {/* <div className="flex items-center">
            <div className="shrink-0 ">
              <SearchMolecule handleChange={handleSearch} />
            </div>
          </div> */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {authUser?.user_type === UserType.SUPER_ADMIN && (
                <div className="px-12">
                  <Link to={`/dashboard/institution/${authUser?.institution_id}/edit`}>
                    <Button styleType="outline">Edit institution</Button>
                  </Link>
                </div>
              )}
              <button className="bg-main p-1 rounded-full flex text-gray-400">
                <Icon name="switch" />
                <Icon name="settings" />
                <div className="relative">
                  <Icon name="notification" />
                  <div className="bg-main rounded-full h-3 w-3 absolute top-3 right-4 flex items-center justify-center">
                    <span className="absolute  w-2 h-2  bg-red-600 self-center rounded-full"></span>
                  </div>
                </div>
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div className="flex">
                  <button
                    className="max-w-xs bg-main rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    <span className="sr-only">Open user menu</span>
                    <Avatar
                      src="https://static.thenounproject.com/png/2643367-200.png"
                      alt="profile"
                      size="34"
                    />
                  </button>
                  <div className="pl-2">
                    <p>{authUser?.username}</p>
                    <p className="text-xs pt-1 text-txt-secondary">
                      {authUser?.user_type.replaceAll('_', ' ')}
                    </p>
                  </div>
                </div>
                {/*  
                Profile dropdown panel, show/hide based on dropdown state.
              */}
                {showProfileMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1 rounded-md bg-white shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu">
                      {/* <a
                        href="#"
                        className="block px-4 py-2 text-sm text-txt-primary hover:bg-gray-100"
                        role="menuitem">
                        Your Profile
                      </a> */}
                      <Link
                        to={`/dashboard/users/${authUser?.id}/profile?mine=${true}`}
                        className="block px-4 py-2 text-sm text-txt-primary hover:bg-gray-100">
                        Your Profile
                      </Link>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-txt-primary hover:bg-gray-100"
                        role="menuitem">
                        Settings
                      </a>
                      <button
                        disabled={logoutFn.isLoading}
                        onClick={() => logout()}
                        className="block px-4 box-border text-left py-2 text-sm text-txt-primary hover:bg-gray-100 w-full"
                        role="menuitem">
                        {logoutFn.isLoading ? 'Signing out ....' : 'Sign out'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className="block h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className="hidden h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu open: "block", Menu closed: "hidden" */}
      <div className={`md:hidden ${showMenu ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
          {links.map((link, i) => (
            <Link
              key={link.text}
              to={link.to}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === link.to ? activeClass : inactiveClass
              } ${i > 0 && 'mt-1'}`}>
              {link.text}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://static.thenounproject.com/png/2643367-200.png"
                alt="profile"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                {authUser?.username}
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                {authUser?.email}
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
              Your Profile
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
              Settings
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
