import { Button } from "./Buttons"

export default function Card() {
    return (
        <div className="flex flex-col">
            <div className="w-full h-[200px] bg-slate-200"></div>

            <div>
                <p className="line-clamp-1 text-lg"></p>
                <p>stars</p>

                <div className="text-sm flex flex-row justify-between mb-5">
                    <p>THAI | $$$</p>
                    <div className="flex flex-row">
                        <p>-</p>
                        <p>Open Now</p>
                    </div>
                </div>
                <Button text="Learn More" className="var2"/>
            </div>
        </div>
    )
}