import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
 
export function DrawerPlacement() {

  const [openBottom, setOpenBottom] = React.useState(false);
 

  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);
  

 
  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
      <button  onClick={openDrawerBottom} className="bg-transparent hover:bg-[#051570]  text-[#051570] text-xl font-bold hover:text-white py-2 px-4 border border-[#051570] hover:border-transparent shadow-lg rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105">
                Book Session
              </button>
      </div>
    

      <Drawer
        placement="bottom"
        open={openBottom}
        onClose={closeDrawerBottom}
        className="p-4 h-screen overflow-y-scroll"


      >
        <div className="overflow-x-hidden" >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Book Your Slote
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerBottom}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="bg-white">
        <form className="w-full">
  {/* ... Existing form fields ... */}
  
  {/* Add a section for selecting date and time */}
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-appointment-date">
        Select a Date and Time for the Appointment
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-appointment-date"
        type="datetime-local"
      />
    </div>
  </div>

  {/* ... Remaining form fields ... */}

  {/* Add a submit button */}
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </div>
  </div>
</form>

            
            
        </div>
        </div>
      </Drawer>
   
    </React.Fragment>
  );
}