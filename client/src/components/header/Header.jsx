import {
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file


const Header = ({ type }) => {
 return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <span>Rent</span>
          </div>
          <div className="headerListItem">
            <span>Buy</span>
          </div>
          <div className="headerListItem">
            <span>Sell</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
      
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Search Property to rent
            </p>
            <button className="headerBtn">Sign in / Register</button>
           
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
