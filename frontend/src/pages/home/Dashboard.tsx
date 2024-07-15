const Dashboard = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 p-6">
      <div className="flex flex-col w-full h-full border border-primary-900">
        <div className="header p-4">
        <div className="flex justify-between">
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
        </div>
        <div className="flex-1 border border-primary-900">
          <div className="flex">
            <div className="sidebar w-80 p-5">
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