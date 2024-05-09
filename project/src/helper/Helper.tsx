import { Star, DollarSign } from 'lucide-react';

export function getRating(rating : number) {
    rating = (rating % 5) + 1;
    return (
        <div className="flex flex-row w-fit">
            {
                Array(rating).fill(0).map((_, index) => {
                    return <Star width={15} className="text-sky-500"/>
                })
            }  
            {
                Array(5 - rating).fill(0).map((_, index) => {
                    return <Star width={15} className="text-gray-400"/>
                })
            }
        </div>
    )
}

export function getPrice(price : number) {
    return (
        <div className="flex flex-row w-fit items-center justify-center">
            {
                Array(price).fill(0).map((_, index) => {
                    return <DollarSign width={12}/>
                })
            }  
        </div>
    )
}