import { Button } from "../components/Buttons";
import Divider from "../components/Divider";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { Restaurant } from "../lib/types";

export default function Home() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [display, setDisplay] = useState<Restaurant[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openOnly, setOpenOnly] = useState(false); 
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [showingAll, setShowingAll] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetch(process.env.REACT_APP_API + '/restaurant')
        .then(response => response.json())
        .then(data => {
            setRestaurants(data)
            setLoading(false)
            // setDisplay with 8 items
            setDisplay(data.slice(0, 8))
        })
        .catch(error => {
            setError(error)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (restaurants.length > 8) {
            setShowMore(true)
        }
    }, [restaurants])

    const handleShowMore = () => {
        let filteredRestaurants = restaurants;
        if (openOnly) {
            filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.open);
        }

        if (display.length === filteredRestaurants.length) {
            return;
        }

        if (display.length + 8 >= filteredRestaurants.length) {
            setDisplay([...display, ...filteredRestaurants.slice(display.length, filteredRestaurants.length)]);
            setShowMore(false);
        } else {
            setDisplay([...display, ...filteredRestaurants.slice(display.length, display.length + 8)]);
            setShowMore(true);
        }
    };

    const openOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setOpenOnly(isChecked);
        let filteredRestaurants = restaurants;
        if (isChecked) {
            filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.open);
        }
        setDisplay(filteredRestaurants.slice(0, 8));
        setShowMore(filteredRestaurants.length > 8);
    };

    const priceOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPrice(value);
    }

    const categoryOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCategory(value);
    }

    useEffect(() => {
        let query = "?";
        if (category) {
            query += `category=${category}&`;
        }
        if (price) {
            query += `price=${price}&`;
        }

        console.log(query);

        setLoading(true)
        fetch(process.env.REACT_APP_API + '/restaurant' + query)
        .then(response => response.json())
        .then(data => {
            if (openOnly) {
                data = data.filter((restaurant: Restaurant) => restaurant.open);
            }
            
            if (data !== "Not found") {
                setRestaurants(data)
                // setDisplay with 8 items
                setDisplay(data.slice(0, 8))
                setShowMore(data.length > 8)
            } else {
                setRestaurants([])
                setDisplay([])
                setShowMore(false)
            }
            setLoading(false)
        })
        .catch(error => {
            setError(error)
            setLoading(false)
        })
    }, [price, category])

    useEffect(() => {
        if (price || category || openOnly) {
            setShowingAll(false)
        } else {
            setShowingAll(true)
        }
    })

    const clearHandle = () => {
        setPrice("");
        setCategory("");
        setOpenOnly(false);
        if (document.getElementById("price")) {
            (document.getElementById("price") as HTMLSelectElement).selectedIndex = 0;
        }
        if (document.getElementById("category")) {
            (document.getElementById("category") as HTMLSelectElement).selectedIndex = 0;
        }
        if (document.getElementById("openNow")) {
            (document.getElementById("openNow") as HTMLInputElement).checked = false;
        }
        setShowingAll(true);
    }

    const getPriceBorderStyle = () => {
        return price === "" ? "" : "border-sky-500 border-b-2";
    };

    const getCategoryBorderStyle = () => {
        return category === "" ? "" : "border-sky-500 border-b-2";
    }

    return (
        <div className="flex flex-col justify-center">
            <div>
                <p className="text-xl font-bold">Restaurant</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, odit ut modi, <br />quibusdam repellendus velit ex voluptatibus aliquid ducimus dolorum voluptas assumenda</p>
            </div>
            <Divider/>
            <div className="flex md:flex-row flex-col md:justify-between">

            
                <div className="flex md:flex-row flex-col md:gap-5 gap-2">
                    <p>Filter by:</p>
                    <div className="flex flex-row gap-3 justify-between md:justify-start mb-3 md:mb-0">
                        <div className="flex flex-row items-center gap-1">
                            <input onChange={openOnChange} type="checkbox" id="openNow" name="openNow" value="true"/>
                            <label htmlFor="openNow"> Open Now</label><br></br>
                        </div>
                        <select name="price" id="price" onChange={priceOnChange} className={`bg-slate-50 ${getPriceBorderStyle()}`}>
                            <option value="">Price</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                        </select>
                        <select name="category" id="category" onChange={categoryOnChange} className={`bg-slate-50 ${getCategoryBorderStyle()}`}>
                            <option value="">Category</option>
                            <option value="Thai">Thai</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Japanese">Japanese</option>
                            <option value="American">American</option>
                        </select>
                    </div>
                </div>

                <Button text="Clear All" onClick={clearHandle}/>
            </div>

            <div className="mt-5">
                {   
                    showingAll && <p className="text-xl">All Restaurants</p>
                }

                <div className="grid md:grid-cols-4 grid-cols-2 gap-7 pb-20">
                    {
                        !error && !loading &&  display.length > 0 && display.map((restaurant, index) => {
                            return (
                                <Card
                                    restaurant={restaurant} key={index}
                                />
                            )
                        
                        })
                    }
                </div>
                
            </div>
            {showMore && (
                <a
                className="mb-10 -translate-y-10 self-center bg-sky-500 text-white px-5 py-1 rounded-md hover:bg-sky-600 transition-all duration-300 ease-in-out w-full max-w-3xl text-center hover:cursor-pointer"
                onClick={handleShowMore}
                >
                View More
                </a>
            )}
            {
                loading && <p className="text-center self-center">Loading...</p>
            }
            {
                error && <p className="text-center self-center">An error occured {error}</p>
            }
            {
                !loading && !error && display.length === 0 && <p className="text-center self-center">No restaurants found</p>
            }
        </div>
    );
};