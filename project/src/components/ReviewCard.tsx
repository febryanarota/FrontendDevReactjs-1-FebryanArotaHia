import { getRating } from "../helper/Helper";
import { Review } from "../lib/types";

export default function ReviewCard({review} : {review: Review}) {
    return (
        <div className="flex flex-col mt-10">
            <div className="flex flex-row gap-3 mb-2">
                <img src={review.image} alt={review.name} className="w-7 h-7 rounded-full"/>
                <p className="font-semibold">{review.name}</p>
            </div>
            <p>{review.text}</p>
            <p className="self-end">{getRating(review.rating)}</p>
        </div>
    )
}