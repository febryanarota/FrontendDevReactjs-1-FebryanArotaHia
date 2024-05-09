import { Restaurant } from "../lib/types"
import { Button } from "./Buttons"
import { DollarSign, Star, Dot } from 'lucide-react';
import { getPrice, getRating } from "../helper/Helper"

export default function Card({restaurant} : {restaurant: Restaurant}) {
    const learnMoreHandler = () => {
        // redirect to detail page
        window.location.href = `/detail/${restaurant.id}`
    }

    return (
        <div className="flex flex-col">
            <div className="w-full h-[200px] bg-slate-200 rounded-md overflow-hidden">
                {
                    restaurant.open == true ?
                        <img src={restaurant.picture} alt={restaurant.name} className="w-full h-full object-cover"/>
                    :
                    <div className="relative w-full h-full flex justify-center items-center">
                        <div className="w-full h-full absolute bg-black bg-opacity-50"></div>
                        <p className="absolute text-white text-center">Temporarily<br />Closed</p>
                        <img src={restaurant.picture} alt={restaurant.name} className="w-full h-full object-cover"/>
                    </div>
                        
                }
            </div>

            <div>
                <p className="line-clamp-1 text-lg font-semibold my-2">{restaurant.name}</p>
                <p>{getRating(restaurant.rating)}</p>

                <div className="text-sm flex md:flex-row flex-col justify-between mb-5">
                    <div className="flex flex-row gap-1 ">
                        <p>{restaurant.category}</p>
                        <p> | </p>
                        <p>{getPrice(restaurant.price)}</p>
                    </div>
                    
                    {
                        restaurant.open ?
                            <div className="flex flex-row">
                                <p className="font-light">OPEN NOW</p>
                                <Dot className="text-green-600"/>
                            </div>
                        :   
                            <div className="flex flex-row">
                                <p className="font-light">CLOSED</p>
                                <Dot className="text-red-600"/>
                            </div>
                    }
                </div>
                <Button text="Learn More" className="var2" onClick={learnMoreHandler}/>
            </div>
        </div>
    )
}

