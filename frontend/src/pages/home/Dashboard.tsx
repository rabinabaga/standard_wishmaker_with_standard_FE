import { useState } from "react";

const Dashboard = () => {
const [showMenuMobile, setShowMenuMobile] = useState(false);
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
 const toggleMenu = ()=>{
  setShowMenuMobile(!showMenuMobile)
 }

 
  return (
    <div className="h-screen w-screen bg-gray-100 p-6">
      <div className="flex flex-col w-full h-full border border-primary-900">
        <div className="header p-4">
        <div className="flex justify-between">
            <div className="block lg:hidden">
              <button id="mobile-menu-btn" onClick={() => (setShowMenuMobile(!showMenuMobile))}className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
            <p className="text-2xl">WishMaker</p>
            <div className="flex w-[465px]">
                <div className="search w-72">
                  Search
                </div>
                <div className="avatar-options">
                  Image
                </div>
            </div>
        </div>
          {/* <!-- Mobile menu --> */}
          <div
            className={`fixed relative lg:hidden bg-black-200 text-white py-2 ${showMenuMobile ? 'w-full' : 'w-0'
              }`}
            style={{ transition: 'width 0.3s ease' }}
          > 
            <div className="absolute z-100 text-white-primary">Dashboard</div>
            <div className="h-screen bg-opacity-50 bg-black-light" onClick={toggleMenu}></div>
          </div>
         
        </div>
        <div className="flex-1 border border-primary-900">
          <div className="flex">
            <div className={`sidebar hidden w-80 p-5 lg:block`}>
              <div className="w-full mb-4">
                Dashboard
              </div>
              <div className="w-full mb-4">
                Campaign
              </div>
              <div className="w-full mb-4">
                Donors
              </div>
              <div className="w-full mb-4">
                Withdraw Request
              </div>
              <div className="w-full mb-4">
                Payout Settings
              </div>
            </div>
            <div className="flex-1 p-5">
              <div className="flex flex-col">
                <div className="grid h-56 grid-cols-3 py-5 gap-5">
                  <div className="h-full col-span-1 border border-primary-900 p-5 bg-gradient-to-b from-purple-300 to-purple-800 h-64 w-full rounded-md">Total Campaign</div>

                  <div className="h-full col-span-1 border border-primary-900 p-5 bg-gradient-to-b from-red-300 to-red-800 rounded-md">Total Donations</div>
                  <div className=" h-fullcol-span-1 border border-primary-900 p-5 bg-gradient-to-b from-yellow-300 to-yellow-800 rounded-md">Total Donors</div>

                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-4 gap-5">
                    <div className="col-span-1">
                     <div className="flex flex-col">
                      Campaigns
                      <div className="h-20 border border-primary-900">Campaign 1</div>
                        <div className="h-20 border border-primary-900">Campaign 1</div>
                        <div className="h-20 border border-primary-900">Campaign 1</div>
                        <div className="h-20 border border-primary-900">Campaign 1</div><div className="h-20 border border-primary-900">Campaign 1</div><div className="h-20 border border-primary-900">Campaign 1</div><div className="h-20 border border-primary-900">Campaign 1</div><div className="h-20 border border-primary-900">Campaign 1</div>
                     </div>
                    </div>
                    <div className="charts-and-lists col-span-3">
                      <div className="flex flex-col gap-5">
                        <div className="charts h-[465px] border border-primary-900 p-5"> charts</div>
                        <div className="table"> 
                          Table
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;