import { Data } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getData = async() : Promise<Data[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {data, error} = await supabase
        .from('Data')
        .select('*')
    
    console.log(data as any)
    if(error){
        console.log(error)
    }

    return data as any || []
}

export default getData