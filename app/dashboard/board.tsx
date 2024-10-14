"use client";
import Image from "next/image";
import {
  DisclosureButton,
  DisclosurePanel,
  Disclosure,
} from "@headlessui/react";
import {
  FaHome,
  FaUserFriends,
  FaFolder,
  FaCalendar,
  FaFileAlt,
  FaChartPie,
  FaBell,
  FaChartLine
} from "react-icons/fa";
import { 
  MdOutlineSyncAlt, 
  MdOutlineNotificationImportant } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import AvatarDropdown from "../components/avatar";
import ChartComponent from "../components/ChartComponent";
import Home from "../components/home";
import Replications from "../components/replications";

function Board() {

  const [configPageVisible, setConfigPageVisible] = useState(true);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [replicationVisible, setReplicationVisible] = useState(false);

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  const showDashboard = (e: any) => {
    e.preventDefault();
    showDashboardvalues();
  };

  const showHome = (e: any) => {
    e.preventDefault();
    setConfigPageVisible(true);
    setDashboardVisible(false);
    setReplicationVisible(false);
  };

  const showReplications  = (e: any) => {
    e.preventDefault();
    setReplicationVisible(true);
    setConfigPageVisible(false);
    setDashboardVisible(false);
  };

  const showDashboardvalues = () => {
    setDashboardVisible(true);
    setConfigPageVisible(false);
    setReplicationVisible(false);
  }

  const handleReplicationSelect = (key: any) => {
    showDashboardvalues();
  }

  return (
    <main className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white px-3 gap-6 flex flex-col">
        <div className="flex items-center justify-start">
          {/* Logo */}
          <div className="my-5">
            <Image src={""} width={100} height={20} alt="Logo" />
          </div>
        </div>
        <nav>
          <ul>
          <li className="mb-2">
              <button className="flex w-full items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md" onClick={showHome}>
                <FaHome className="mr-3" />
                Home
              </button>
            </li>
            <li className="mb-2">
              <button className="flex w-full items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md" onClick={showDashboard}>
                <FaChartLine className="mr-3" />
                Dashboard
              </button>
            </li>
            <li className="mb-2">
              <button className="flex w-full items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md" onClick={showReplications}>
                <MdOutlineSyncAlt className="mr-3" />
                Replications
              </button>
            </li>
            <li className="mb-2">
              <button className="flex w-full items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md">
                <MdOutlineNotificationImportant className="mr-3" />
                Alerts
              </button>
            </li>
            <li className="mb-2">
              <button className="flex w-full items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md">
                <TbLogs className="mr-3" />
                Logs
              </button>
            </li>
            <li className="mb-2">
              <button className="flex w-full items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md">
                <FaFileAlt className="mr-3" />
                Documents
              </button>
            </li>
            <li className="mb-2">
              <button className="flex w-full items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white rounded-md">
                <FaChartPie className="mr-3" />
                Reports
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-2 px-4 bg-white shadow">
          <div className="focus:outline-none flex gap-3 items-center w-2/4  p-2 rounded-md text-sm text-gray-900 placeholder-gray-500">
            <CiSearch size={30} />
            <input
              placeholder="Search..."
              className="focus:outline-none  w-full"
            />
          </div>
          <div className="flex items-center">
            {/* <button className="text-gray-600 hover:text-gray-800 mr-4">
              <FaBell />
            </button> */}
            <AvatarDropdown />
          </div>
        </header>

        {/* Detail Area */}
        {dashboardVisible && <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <div className="h-full  border-dashed border-gray-200">
            <ChartComponent />
            </div>
          </div>
        </main>}

        {configPageVisible &&  <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <div className="h-full  border-dashed border-gray-200">
            <Home />
            </div>
          </div>
        </main>}


        {replicationVisible &&  <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <div className="h-full  border-dashed border-gray-200">
            <Replications onReplicationSelect={handleReplicationSelect} />
            </div>
          </div>
        </main>}

      </div>
    </main>
  );
}

export default Board;
