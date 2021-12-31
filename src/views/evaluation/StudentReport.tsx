import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Atoms/custom/Loader";
import { evaluationStore } from "../../store/evaluation/evaluation.store";
import { ParamType } from "../../types";

export default function StudentReport(){

    const {id} = useParams<ParamType>();
    console.log(id);

    const {data:studentReport, isLoading}  = evaluationStore.getStudentReport(id);
    console.log(studentReport);
    return(
        <>
        {isLoading && <Loader/>}
        <div>Student Report</div>
        </>
    )
}