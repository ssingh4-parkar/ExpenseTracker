import {type Trip} from "../types";

export const getTrips=():Trip[]=>{
    return JSON.parse(localStorage.getItem("trips") || "[]");
}

export function saveTrips(trips:Trip[]){
    localStorage.setItem("trips",JSON.stringify(trips));

}