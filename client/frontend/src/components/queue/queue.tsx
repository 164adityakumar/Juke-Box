import { wsManager } from "@/utils/ws";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";



export function Queue()
{   const [data, setData] = useState(); 
    useEffect(() => {
        wsManager.getqueue(setData);

    }, [data]);
    
    return (
        <div>
            <h1>Queue</h1>
            <div >
                <p className="">{JSON.stringify(data)}</p>
            </div>
        </div>
    );

}