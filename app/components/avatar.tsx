"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { HiChevronDown } from "react-icons/hi"; // Import the ChevronDown icon from react-icons/hi

export default function AvatarDropdown() {
  return (
    <Menu as="div">
      <div>
        <MenuButton className="flex gap-2 items-center text-gray-700 hover:text-gray-900 focus:outline-none">
          <Image
            src={
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            alt="Profile"
            width={30}
            height={30}
            className="rounded-full object-cover border border-gray-300"
          />
          <h6>Hafiz Hussain</h6>
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-1">
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex items-center px-4 py-2 text-sm`}
              >
                Profile
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex items-center px-4 py-2 text-sm`}
              >
                Logout
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } group flex items-center px-4 py-2 text-sm`}
              >
                Online
              </a>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
