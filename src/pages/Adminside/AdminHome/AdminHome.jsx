import React,{useEffect,useState} from 'react'
import AdminFirstBody from '../../../components/AdminHelpers/AdminFirstBody'
import AdminCards from './AdminCards'
import AdminVendorCards from './AdminVendorCards'
import PublicAxios from '../../../Axios/PublicAxios'
import PrivateAxios from '../../../Interceptor/AxiosInterceptor'
const AdminHome = () => {
    const [statisticalData, setStatisticalData] = useState({});
    const [payment ,Setpayment] = useState({});
    useEffect(() => {
  
      PrivateAxios.get("adminside/adminstatisticaldata/")
        .then((response) => {
          // Update the state with the fetched data
          setStatisticalData(response.data.data);
          Setpayment(response.data.payments_list)
          console.log("there is", response.data.payments_list);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  
  return (
   <>
    <div className="px-4 pb-24 h-screen overflow-auto md:px-6">
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
     An OverView
      </h1>
      <h2 className="text-gray-400 text-md">
        Here&#x27;s what&#x27;s happening with your Zenithcare platforms.
      </h2>
      <AdminFirstBody />
      <AdminCards statisticalData={statisticalData}/>
      <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 lg:grid-cols-3">

      </div>
    <AdminVendorCards payment={payment} />
    </div>
  </>
  )
}

export default AdminHome