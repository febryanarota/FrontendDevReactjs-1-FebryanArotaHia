import { Button } from "../components/Buttons";
import Divider from "../components/Divider";
import Card from "../components/Card";

export default function Home() {

    return (
        <div>
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
                            <input type="checkbox" id="openNow" name="openNow" value="true"/>
                            <label htmlFor="openNow"> Open Now</label><br></br>
                        </div>
                        <select name="price" id="price">
                            <option value="1">1000-2000</option>
                            <option value="2">2000-3000</option>
                            <option value="3">3000-4000</option>
                            <option value="4">4000</option>
                        </select>
                        <select name="category" id="category">
                            <option value="1">1000-2000</option>
                            <option value="2">2000-3000</option>
                            <option value="3">3000-4000</option>
                            <option value="4">4000</option>
                        </select>
                    </div>
                </div>

                <Button text="Clear All"/>
            </div>

            <div className="mt-5">
                <p className="text-xl">All Restaurants</p>

                <div className="grid md:grid-cols-4 grid-cols-2 gap-7">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </div>
    );
};


// Main
// - Filter navigation
// - Open now (client side filter)
// - Price (client side filter)
// - Categories/Cuisines (server side search filter)
// - Section
// - Restaurant item
// - Image (use first item in `photos`)
// - Cuisine / Categories (use first item in `categories`)
// - Rating
// - Price range
// - Open / Closed
// - Restaurant name
// - Learn more (navigate to Detail View)
