import { Queue } from "@/components/queue/queue";
import { Search } from "@/components/search/search";

export default function Room() {
  return(<div className="gradient-background h-[100vh] grid grid-cols-12 ">
    <div className="col-start-1 col-span-3 border-gray-100 border h-[100vh]"> <Queue/></div>
    <div className="col-start-4 col-end-10"><Search /></div>
    <div className="col-start-10 col-span-3 border border-red-100"></div>
  </div>
  )
}

