import { useParams } from "react-router-dom";
import { Restaurant, Review } from "../lib/types";
import { useEffect, useState } from "react";
import { ChevronRight, MapPin, Phone } from 'lucide-react';
import { getPrice, getRating } from "../helper/Helper";
import Divider from "../components/Divider";
import ReviewCard from "../components/ReviewCard";

export default function Detail() {
    const [restaurant, setRestaurant] = useState<Restaurant>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [display , setDisplay] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_API + '/restaurant/' + params.id)
        .then(response => response.json())
        .then(data => {
            setRestaurant(data)
        })
        .catch(error => {
            setError(error)
        })
    }, [])



    useEffect(() => {
        setLoading(true)
        fetch(process.env.REACT_APP_API + '/restaurant/' + params.id + '/review')
        .then(response => response.json())
        .then(data => {
            setReviews(data)
            setDisplay(data.slice(0, 3))
            setLoading(false)
        })
        .catch(error => {
            setError(error)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (reviews.length > 3) {
            setShowMore(true)
        }
    }, [reviews])

    const handleShowMore = () => {

        if (display.length + 3 >= reviews.length) {
            setDisplay([...display, ...reviews.slice(display.length, reviews.length)]);
            setShowMore(false);
        } else {
            setDisplay([...display, ...reviews.slice(display.length, display.length + 3)]);
            setShowMore(true);
        }
    };

    let params = useParams();
    return (
        <div>
            <div className="flex flex-row ">
                <a href="/" className="text-gray-400 hover:text-black">Home</a>
                <ChevronRight className="text-gray-400"/>
                <p>{restaurant?.name}</p>
            </div>
            <div className="w-full h-[300px] rounded-3xl overflow-hidden shadow-lg mt-5">
                <img src={restaurant?.picture} alt={restaurant?.name} className="w-full h-full object-cover"/>
            </div>

            <div className="mt-5">
                <p className="text-4xl font-bold text-sky-600">{restaurant?.name}</p>
                {
                    restaurant?.rating && restaurant?.price &&
                    <div className="flex flex-row justify-between items-center">
                        <p>{getPrice(restaurant.price)}</p>
                        <p>{getRating(restaurant.rating)}</p>
                    </div>
                }
                <Divider/>
                <p className="text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio esse suscipit labore exercitationem, iusto odio laboriosam harum atque laborum aliquid cumque? Reprehenderit quam eos autem tempora. Earum perspiciatis accusamus tempora?</p>
                <div className="py-5 flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <a href="https://maps.app.goo.gl/ELyvg3ZsDDAbAUfQ7" target="_blank" rel="noreferrer">
                            <MapPin className="text-sky-500 h-5"/>
                        </a>
                        <a href="https://maps.app.goo.gl/ELyvg3ZsDDAbAUfQ7" target="_blank" rel="noreferrer">
                            Lorem ipsum dolor sit amet consectetur adipisicing.
                        </a>
                    </div>
                    <div className="flex flex-row gap-2">
                        <a>
                            <Phone className="text-sky-500 h-5"/>
                        </a>
                        <p>+62 12345632</p>
                    </div>
                </div>

                <Divider/>

                <div className="mb-20">
                    {
                        display && display.map((review) => {
                            return (
                                <ReviewCard review={review}/>
                            )
                        })
                    }
                </div>
                {
                    loading && <p className="text-center -translate-y-10">Loading...</p>
                }
                {
                    error && <p className="text-center -translate-y-10">An error occured</p>
                } 
                {
                    showMore && (
                        <div className="flex justify-center -translate-y-10">
                            <button onClick={handleShowMore} className="bg-sky-500 text-white px-5 py-1 rounded-md hover:bg-sky-600 transition-all duration-300 ease-in-out">Show More</button>
                        </div>
                    )
                }
                {
                    display.length === 0 && <p className="text-center -translate-y-10">No reviews available</p>
                }
            </div>
        </div>
    )
}