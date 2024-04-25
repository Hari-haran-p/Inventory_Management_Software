import React from "react";

function RegisterPage() {

  return (
    
    <div className="h-full w-full flex justify-center items-center bg-sky-200">
      <div className="w-96 h-3/4 bg-white rounded-3xl pt-5">
        <div className="h-1/4 flex flex-col justify-center items-center ">
          <img className="w-24 h-24 " src="/images/bit-logo.png" alt="" />
          <div className="text-4xl">stores</div>
        </div>
        <form
          action=""
          method=""
          className="flex flex-col justify-start items-center h-3/4 w-full pt-4"
        >
          <div className="flex flex-col w-3/4">
            <label for="position">none</label>
            <input
              className="w-full border-2 border-black rounded-lg h-8 indent-2"
              list="position"
              name="position"
              id="position"
              required
            />
            <datalist name="position" id="position">
              <option value="volvo">Volvo</option>
            </datalist>
          </div>
          <div className="flex flex-col w-3/4 pt-4">
            <label for="username" className="">
              Username
            </label>
            <input
              type="text"
              className="border-black border-2 rounded-lg w-full h-8 indent-2 "
              required
              id="username"
              placeholder="Username"
            />
          </div>

          <div className="flex flex-col w-3/4 pt-4">
            <label for="password" className="">
              Password
            </label>
            <input
              type="text"
              className="border-black border-2 rounded-lg w-full h-8 indent-2	"
              required
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="justify-start w-3/4 pt-5">
            <button className="border-2 border-black text-xl rounded-xl pt-1 pb-1 pl-5 pr-5">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
