import Navbar from "./Navbar";
import AccountDisplay from "./AccountDisplay";
import Graph from "./Graph";
import DPH from "./DPH";
import Currency from "./Currency";
import Invest from "./Invest";
import "./HomePage.css";
function HomePage() {
    return(
        <div>
            <Navbar/>
            <AccountDisplay/>
            <Graph/>
            <div className="homepage-container">
                <DPH/>
                <Currency/>
                <Invest/>
            </div>

        </div>
    );
}

export default HomePage;
