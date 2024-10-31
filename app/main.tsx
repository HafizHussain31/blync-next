"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

function Form() {
  // Form 1 state
  const [form1Data, setForm1Data] = useState({
    databaseType: "SQL Server",
    hostName: "",
    portNumber: "",
    userName: "",
    password: "",
    databaseName: "",
  });

  // Form 2 state
  const [form2Data, setForm2Data] = useState({
    databaseType: "Couchbase",
    hostName: "",
    portNumber: "",
    userName: "",
    password: "",
    databaseName: "",
  });

  // Handle form 1 submission
  const handleForm1Submit = (e: any) => {
    e.preventDefault();
    console.log("Form 1 Data:", form1Data);
    alert("Form 1 submitted!");
  };

  // Handle form 2 submission
  const handleForm2Submit = (e: any) => {
    e.preventDefault();
    console.log("Form 2 Data:", form2Data);
    alert("Form 2 submitted!");
  };

  // Mohammad Sohail: Handle Input change function form data state mai save

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    form: typeof form1Data | typeof form2Data,
    setFormData: React.Dispatch<
      React.SetStateAction<typeof form1Data | typeof form2Data>
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main className="flex gap-16 justify-center min-h-screen items-center p-8">
      {/* Form 1 */}
      <form
        aria-label="Form-1"
        className="w-full max-w-lg"
        onSubmit={handleForm1Submit}
      >
        <h1 className="mb-4 text-2xl">Source Database</h1>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Database Type
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="databaseType"
                value={form1Data.databaseType}
                onChange={(e: any) => handleInputChange(e, form1Data, setForm1Data)}
              >
                <option>SQL Server</option>
                <option>My SQL</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <MdOutlineArrowDropDown />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Host Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-host-name"
              name="hostName"
              type="text"
              placeholder="http://127.0.0.0"
              value={form1Data.hostName}
              onChange={(e) => handleInputChange(e, form1Data, setForm1Data)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-4 gap-2">
          <div className="w-full px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Port Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="8008"
              name="portNumber"
              value={form1Data.portNumber}
              onChange={(e) => handleInputChange(e, form1Data, setForm1Data)}
            />
            <p className="text-gray-600 text-xs italic">
              Give a proper port number
            </p>
          </div>
          <div className="w-full px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              User Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="sohail9744"
              name="userName"
              value={form1Data.userName}
              onChange={(e) => handleInputChange(e, form1Data, setForm1Data)}
            />
          </div>
          <div className="w-full px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="password"
              placeholder="**************"
              name="password"
              value={form1Data.password}
              onChange={(e) => handleInputChange(e, form1Data, setForm1Data)}
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Database Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Database Name"
              name="databaseName"
              value={form1Data.databaseName}
              onChange={(e) => handleInputChange(e, form1Data, setForm1Data)}
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Form 2 */}
      {/* <form
        aria-label="Form-2"
        className="w-full max-w-lg"
        onSubmit={handleForm2Submit}
      >
        <h1 className="mb-4 text-2xl">Destination Database</h1>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Database Type
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="databaseType"
                value={form2Data.databaseType}
                onChange={(e) => handleInputChange(e, form2Data, setForm2Data)}
              >
                <option>Couchbase</option>
                <option>Mongo DB</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <MdOutlineArrowDropDown />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Host Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-host-name"
              name="hostName"
              type="text"
              placeholder="http://127.0.0.0"
              value={form2Data.hostName}
              onChange={(e) => handleInputChange(e, form2Data, setForm2Data)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-4 gap-2">
          <div className="w-full px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Port Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="8008"
              name="portNumber"
              value={form2Data.portNumber}
              onChange={(e) => handleInputChange(e, form2Data, setForm2Data)}
            />
            <p className="text-gray-600 text-xs italic">
              Give a proper port number
            </p>
          </div>
          <div className="w-full px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              User Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="sohail9744"
              name="userName"
              value={form2Data.userName}
              onChange={(e) => handleInputChange(e, form2Data, setForm2Data)}
            />
          </div>
          <div className="w-full px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="password"
              placeholder="**************"
              name="password"
              value={form2Data.password}
              onChange={(e) => handleInputChange(e, form2Data, setForm2Data)}
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full px-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
              Database Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Database Name"
              name="databaseName"
              value={form2Data.databaseName}
              onChange={(e) => handleInputChange(e, form2Data, setForm2Data)}
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form> */}
    </main>
  );
}

export default Form;
