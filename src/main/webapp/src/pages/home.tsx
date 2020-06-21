import React, {useEffect} from "react";
import Api from "../utils/Api";
import {Header} from "../components/header";

export const HomePage: React.FC = () => {

    useEffect( () => {
        const getData = async () => {
            const data = await Api.get("/actuator/health");
            console.log("fetch data: ", data);
        }

        getData();
    }, []);

    return (
       <>
           <Header />
       </>
    )
}