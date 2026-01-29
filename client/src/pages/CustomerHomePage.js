import CustomerHomePageItemDashBoard from '../pageComponents/CustomerHomePageComponents/CustomerHomePageItemDashBoard'
import CustomerHomePageHeader from '../pageComponents/CustomerHomePageComponents/CustomerHomePageHeader'
import HomePageCarousel from '../pageComponents/HomePageComponents/HomePageCarousel'

function CustomerHomePage() {
  return (
    <div>
      <CustomerHomePageHeader/>
      <HomePageCarousel/>
      <CustomerHomePageItemDashBoard/>
    </div>
  )
}

export default CustomerHomePage