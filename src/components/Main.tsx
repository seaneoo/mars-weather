import {useGetWeatherQuery} from "../api";
import Table from "./Table";

function Main() {
    const {isLoading} = useGetWeatherQuery();

    return (
        <main
            className="flex-grow w-full flex flex-col justify-center items-center mx-auto p-4 md:w-4/5 lg:w-3/4 xl:w-1/2">
            {!isLoading ? (
                <>
                    <h1 className="font-black inline-block self-start text-brand text-5xl m-0 mb-4 bg-gradient-to-r from-[#e7413e] to-[#f2910d] bg-clip-text text-transparent">
                        The Last 7 Days on Mars
                    </h1>
                    <div className="block w-full overflow-x-auto overflow-y-hidden whitespace-nowrap">
                        <Table/>
                    </div>
                </>
            ) : (
                <span>Loading</span>
            )}
        </main>
    );
}

export default Main;