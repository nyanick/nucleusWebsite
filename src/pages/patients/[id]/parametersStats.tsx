import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useEffect, useState, useRef} from "react";
import {IParameter} from "../../../types/parameter";
import {useFindMedicalCareParameters} from "../../../hooks/api/parameter";
import {useToast} from "@chakra-ui/react";
import ParameterModal from "../../../components/ParameterModal";
import ConsultationEntryNotFound from "../../../components/ConsultationEntryNotFound";
import Parameter from "../../../components/Parameter";
import {useFindPatientMedicalCares} from "../../../hooks/api/medical-care";
import {PencilAltIcon} from "@heroicons/react/outline";
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ScatterDataPoint,
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

const Parameters: NextPage = ({}) => {
    const router = useRouter()
    const {data: medicalCares} = useFindPatientMedicalCares(router.query.id)
    let medicalCareId = "" ;
    if(medicalCares ){
        let len = medicalCares.medicalCares.length -1;
        medicalCareId = medicalCares.medicalCares[len]?.medicalCareId;
    }
    const {error: parametersLoadingError, data, isLoading: loadingParameters} = useFindMedicalCareParameters(medicalCareId as string);
    const toast = useToast()
    const canvasEl = useRef(null);

    useEffect(() => {
        if (parametersLoadingError)
            toast({
                position: 'bottom',
                title: "Échec du chargement des paramètres",
                description: "Une erreur est survenue lors du chargement des paramètres",
                status: "error",
                duration: 1000,
                isClosable: true,
            })
    }, [parametersLoadingError])



    let data_temperature: ChartData<"line", (number | ScatterDataPoint)[], unknown> ;
    let data_pressure: ChartData<"line", (number | ScatterDataPoint)[], unknown> ;
    let data_height: ChartData<"line", (number | ScatterDataPoint)[], unknown> ;
    let data_systolicPressure: ChartData<"line", (number | ScatterDataPoint)[], unknown> ;
    let data_weight: ChartData<"line", (number | ScatterDataPoint)[], unknown> ;
    let data_fastingBloodGlucose: ChartData<"line", (number | ScatterDataPoint)[], unknown> ;
    let data_bloodGlucose: ChartData<"line", (number | ScatterDataPoint)[], unknown> ;
    let data_diastolicPressure: ChartData<"line", (number | ScatterDataPoint)[], unknown> ;

    let temperature = [];
    let temperature_dates = [];
    let pressure = [];
    let pressure_dates = [];
    let height = [];
    let height_dates = [];
    let systolicPressure = [];
    let systolicPressure_dates = [];
    let weight = [];
    let weight_dates = [];
    let fastingBloodGlucose = [];
    let fastingBloodGlucose_dates = [];
    let bloodGlucose = [];
    let bloodGlucose_dates = [];
    let diastolicPressure = [];
    let diastolicPressure_dates = [];


    if(data){
        let data1 = [].concat(data).reverse();
        
        data1.forEach((element, i)=>{
            if(element.temperature !== -99){
                temperature.push(element.temperature);
                temperature_dates.push(new Date(element.updatedAt).toLocaleDateString());
            }
            if(element.pressure !== -99){
                pressure.push(element.pressure);
                pressure_dates.push(new Date(element.updatedAt).toLocaleDateString());
            }
            if(element.height !== -99){
                height.push(element.height);
                height_dates.push(new Date(element.updatedAt).toLocaleDateString());
            }
            if(element.systolicPressure !== -99){
                systolicPressure.push(element.systolicPressure);
                systolicPressure_dates.push(new Date(element.updatedAt).toLocaleDateString());
            }
            if(element.weight !== -99){
                weight.push(element.weight);
                weight_dates.push(new Date(element.updatedAt).toLocaleDateString());
            }
            if(element.fastingBloodGlucose !== -99){
                fastingBloodGlucose.push(element.fastingBloodGlucose);
                fastingBloodGlucose_dates.push(new Date(element.updatedAt).toLocaleDateString());
            }
            if(element.bloodGlucose !== -99){
                bloodGlucose.push(element.bloodGlucose);
                bloodGlucose_dates.push(new Date(element.updatedAt).toLocaleDateString());
            }
            if(element.diastolicPressure !== -99){
                diastolicPressure.push(element.diastolicPressure);
                diastolicPressure_dates.push(new Date(element.updatedAt).toLocaleDateString());
            }

        });
        console.log(fastingBloodGlucose);

        data_temperature = {
            labels: temperature_dates,
            datasets: [
                {
                label: "Température ºC",
                backgroundColor: "#3182ce",
                borderColor: "#3182ce",
                data: temperature,
                fill: false,
                },
            ],
        };
        data_pressure = {
            labels: pressure_dates,
            datasets: [
                {
                label: "Pression artérielle (mmHg)",
                fill: false,
                backgroundColor: "#800000",
                borderColor: "#800000",
                data: pressure,
                }
            ],
        };
        data_height = {
            labels: height_dates,
            datasets: [
                {
                label: "Taille (Cm)",
                fill: false,
                backgroundColor: "#000000",
                borderColor: "#000000",
                data: height,
                }
            ],
        };
        data_systolicPressure = {
            labels: systolicPressure_dates,
            datasets: [
                {
                label: "Pression artérielle systolique (mmHg)",
                fill: false,
                backgroundColor: "#FFA500",
                borderColor: "#FFA500",
                data: systolicPressure,
                }
            ],
        };
        data_weight = {
            labels: weight_dates,
            datasets: [
                {
                label: "Poids (Kg)",
                fill: false,
                backgroundColor: "#00008B",
                borderColor: "#00008B",
                data: weight,
                }
            ],
        };
        data_fastingBloodGlucose = {
            labels: fastingBloodGlucose_dates,
            datasets: [
                {
                label: "Glycémie à Jeûn (g/l)",
                fill: false,
                backgroundColor: "#FF00FF",
                borderColor: "#FF00FF",
                data: fastingBloodGlucose,
                }
            ],
        };
        data_bloodGlucose = {
            labels: bloodGlucose_dates,
            datasets: [
                {
                label: "Glycémie (g/l)",
                fill: false,
                backgroundColor: "#800080",
                borderColor: "#800080",
                data: bloodGlucose,
                }
            ],
        };
        data_diastolicPressure = {
            labels: diastolicPressure_dates,
            datasets: [
                {
                label: "Pression artérielle diastolique (mmHg)",
                fill: false,
                backgroundColor: "#FF0000",
                borderColor: "#FF0000",
                data: diastolicPressure,
                }
            ],
        };
    }
    
    return (
        <>
            <main>
                <section className='col-span-1'>
                <h2>Statistiques les plus récentes sur les paramètres des soins médicaux</h2>
                    { data? 
                    <div className='grid grid-cols-1 gap-1'>
                        { temperature.length > 1? <Line data={data_temperature} height={100} /> :''}
                        { pressure.length > 1? <Line data={data_pressure} height={100} /> :''}
                        { height.length > 1? <Line data={data_height}  height={100} /> : ''}
                        { weight.length > 1? <Line data={data_weight}  height={100} /> :''}
                        { systolicPressure.length > 1? <Line data={data_systolicPressure}  height={100} /> :''}
                        {fastingBloodGlucose.length > 1? <Line data={data_fastingBloodGlucose}  height={100} /> :''}
                        { bloodGlucose.length > 1? <Line data={data_bloodGlucose}  height={100} /> :''}
                        { diastolicPressure.length > 1?  <Line data={data_diastolicPressure}  height={100} /> : ''}
                    
                    </div>
                    
                    : ''}
                    

                </section>
            </main>
        </>
    );
};

export default Parameters;