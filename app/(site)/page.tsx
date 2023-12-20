import getData from "@/actions/getData"
import PredictionPlayground from "@/components/Playground/prediction"

export default async function Home() {
    const data = await getData()
    return(
        <div>
            {data.map((items) => (
                <PredictionPlayground data={items} key={items.id}/>
            ))}
        </div>
    )
}