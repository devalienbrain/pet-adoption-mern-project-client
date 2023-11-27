import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import CallToAction from "./CallToAction/CallToAction";
import Categories from "./Categories/Categories";
import DonateMonthly from "./DonateMonthly/DonateMonthly";
import JoinWithUs from "./JoinWithUs/JoinWithUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <JoinWithUs></JoinWithUs>
      <AboutUs></AboutUs>
      <CallToAction></CallToAction>
      <DonateMonthly></DonateMonthly>
    </div>
  );
};

export default Home;
