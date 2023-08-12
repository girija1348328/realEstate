import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const [destination, setDestination] = useState(undefined);
  const [dates, setDates] = useState(undefined);
  const [openDate, setOpenDate] = useState(false);
  const [propertyType, setPropertyType] = useState(undefined)
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);


  const { data, loading, error, reFetch } = useFetch(
    `/property${destination || propertyType || min || max ?
      `?city=${destination}&type=${propertyType}&min=${min || 0}&max=${max || 999}`
      : ""
    }`
  );
  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>; // Display an error message to the user
  }

  console.log(data)
  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Location</label>
              <input value={destination || ""} onChange={(e) => setDestination(e.target.value)} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {dates && dates.length > 0 ? // Check if dates is not undefined
                  `${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`
                  : "Select Dates"
                }
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>

            <div className="lsItem">
              <label>Property Type</label>
              <input value={propertyType || ""} onChange={(e) => setPropertyType(e.target.value)} type="text" />
            </div>

            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              Array.isArray(data) ? (
                data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))
              ) : (
                "No data to display"
              )
            )}
          </div>


        </div>
      </div>
   </div>
  );
};

export default List;
