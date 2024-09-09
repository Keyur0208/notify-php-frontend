"use client"
import { useSelector } from "react-redux"
import { RootState } from "../src/store/store";

export function RolesData(){
    
    const { data } = useSelector((state: RootState) => state.auth.userData);
    
    return data;
}