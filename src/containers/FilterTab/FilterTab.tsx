import beers from "../../Data/beers";
import Button from "../../Components/Button/Button";
import { useState } from "react";
import RadioButton from "../../Components/RadioButton/RadioButton";

const FilterTab = () => {
  // each must have radio buttons that filter them.
    // show and hide filter tab when  selected. => state

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const handleClick = () => {
        setShowFilter(!showFilter)
    }
    

  // filter for first brewed
  const onlyYear = (date: string): number => {
    const splitDate = date.split("/").pop();
    if (splitDate) {
      const dateAsNum = parseFloat(splitDate);
      return dateAsNum;
    } else {
      throw new Error("Invalid date format or empty input");
    }
  };

  const modernRange = beers.filter((beer) => {
    const modernYear = onlyYear(beer.first_brewed);
    return modernYear >= 2011;
  });

  const classicRange = beers.filter((beer) => {
    const classicYear = onlyYear(beer.first_brewed);
    return classicYear <= 2010;
  });

  // filter for ABV
  const lowABV = beers.filter((beer) => {
    return beer.abv <= 5.5;
  });

  const highABV = beers.filter((beer) => {
    return beer.abv >= 5.6;
  });

  // filter for acidity

  const strongAcid = beers.filter((beer) => {
    return beer.ph <= 3.9;
  });

  const weakAcid = beers.filter((beer) => {
    return beer.ph >= 4;
  });

 
  return(
    <div className="filter-tab" >
        <div className="filter-tab__button" onClick={handleClick}>
        <Button label="Filter"/>
        </div>
        <div>
            {showFilter && (
            <div className="filter-options">
                <div className="filter-options__first-brewed">
                    <h4>First Brewed</h4>
                    <RadioButton label="Modern Range" groupName="firstBrewed" value={modernRange} />
                    <RadioButton label="Classic Range" groupName="firstBrewed" value={classicRange} />
                </div>
                <div className="filter-options__ABV">
                    <h4>Alcohol By Volume </h4>
                    <RadioButton label="High ABV" groupName="ABV" value={highABV}/>
                    <RadioButton label="Low ABV" groupName="ABV" value={lowABV}/>
                </div>
                <div className="filter-options__acid">
                    <h4>Acidity</h4>
                    <RadioButton label="Strong Acid" groupName="acid" value={strongAcid}/>
                    <RadioButton label="Weak Acid" groupName="acid" value={weakAcid}/>
                </div>
            </div>
        )}
        </div>
        
    

    </div>
  )
};

export default FilterTab;
