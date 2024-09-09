import { ThemeSwitch } from "../theme-switch";
import DropdownUser from "./DropdownUser";
import { Image, Kbd, Tooltip } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { MenuIcon, SearchIcon, TimeIcon } from "../../style/icon/deshoboard";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import Link from "next/link";
import { Admin_Pannel, User_Pannel } from "../../lib/navigation";
import React from "react";
import { useRouter } from "next/navigation";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {

  const route = useRouter();
  const { data } = useSelector((state: RootState) => state.auth.userData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAdminPanel = Admin_Pannel.filter((item) =>
    item.route.toLowerCase().includes(searchTerm) || item.label.toLowerCase().includes(searchTerm)
  );

  const filteredUserPanel = User_Pannel.filter((item) =>
    item.route.toLowerCase().includes(searchTerm) || item.label.toLowerCase().includes(searchTerm)
  );

  const formate_first_name = data?.first_name?.slice(0, 1).toUpperCase();
  const formate_last_name = data?.last_name?.slice(0, 1).toUpperCase();
  const avtar_name = formate_first_name + formate_last_name;

  return (
    <>
      <header className="top-0 flex w-full sticky bg-white z-10 ">
        <div className="flex flex-grow  justify-between  items-center   py-4 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-2 sm:gap-4  ">
            <button
              aria-controls="sidebar"
              className="lg:hidden"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}>
              <MenuIcon />
            </button>
            <button
              className="hover:bg-gray-100 rounded-full size-10 p-2 transition-shadow duration-300 ease-in-out"
              onClick={onOpen}
            >
              <SearchIcon />
            </button>
            <Kbd keys={["command"]}>
              {data?.first_name?.charAt(0).toUpperCase()}
            </Kbd>
          </div>


          <div className="flex gap-3 items-center justify-between cursor-pointer" onClick={() => route.push('/pages/profile')} >
            <Tooltip content={`${data?.first_name} ${data?.last_name}`}>
              <Avatar
                color="primary"
                className="text-white"
                src={data?.profile_image}
                isBordered={true}
                showFallback={!data?.profile_image}
                name={avtar_name}
              />
            </Tooltip>
          </div>
        </div>
      </header>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="opaque"
        className=" h-[30rem]"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 font-semibold rounded-md border-0 focus:border-0 focus:outline-none"
                    autoFocus={true}
                    onChange={handleSearchChange}
                  />
                </div>
                <hr className="mt-2" />
              </ModalHeader>
              <ModalBody>
                {
                  data?.roles?.includes("admin") ? (
                    filteredAdminPanel && Array.isArray(filteredAdminPanel) && filteredAdminPanel.length > 0 ?
                      (
                        filteredAdminPanel.map((groupmenu, groupindex) => (
                          <Link
                            href={groupmenu.route} key={groupindex}
                            onClick={onOpenChange}
                          >
                            <ul className="text-sm text-gray-700 cursor-pointer">
                              <li className="py-2 hover:bg-bg-blue-dashboard px-2 rounded-lg hover:text-blue-500 duration-300">
                                {groupmenu.label}
                                <p className="text-xs text-gray-500">{groupmenu.route}</p>
                              </li>
                              <div className="px-2">
                                <hr />
                              </div>
                            </ul>
                          </Link>
                        ))
                      ) :
                      (
                        <div className="flex flex-col items-center justify-center h-4/5">
                          <h1 className="font-semibold text-xl">Not Found</h1>
                          <p>
                            No results found for
                            <span className="font-semibold pl-1" >{`"${searchTerm}"`}</span>.
                          </p>
                          <p>
                            Try checking for typos or using complete words.
                          </p>
                        </div>
                      )
                  ) : (
                    filteredUserPanel && Array.isArray(filteredUserPanel) && filteredUserPanel.length > 0 ?
                      (
                        filteredUserPanel.map((groupmenu, groupindex) => (
                          <Link
                            href={groupmenu.route}
                            key={groupindex}
                            onClick={onOpenChange}
                          >
                            <ul className="text-sm text-gray-700 cursor-pointer">
                              <li className="py-2 hover:bg-bg-blue-dashboard px-2 rounded-lg hover:text-blue-500 duration-300">
                                {groupmenu.label}
                                <p className="text-xs text-gray-500">{groupmenu.route}</p>
                              </li>
                              <div className="px-2">
                                <hr />
                              </div>
                            </ul>
                          </Link>
                        ))
                      ) :
                      (
                        <div className="flex flex-col items-center justify-center h-4/5">
                          <h1 className="font-semibold text-xl">Not Found</h1>
                          <p>
                            No results found for
                            <span className="font-semibold pl-1" >{`"${searchTerm}"`}</span>.
                          </p>
                          <p>
                            Try checking for typos or using complete words.
                          </p>
                        </div>
                      )
                  )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Header;
