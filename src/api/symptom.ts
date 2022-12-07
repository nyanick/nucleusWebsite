import axios from "./axios";
import {apiRoutes} from "../constants";
import {IConsultationSymptoms} from "../types/symptom";

export const getSymptomsByPatientId = async ({queryKey}) => {
    const params = {
        page: queryKey[2].page,
        size: queryKey[2].size
    }
    const {data, headers} = await axios.get<IConsultationSymptoms[]>(
        `${apiRoutes.SYMPTOMS}/patient/${queryKey[1]}`,
        {params}
    );
    return {
        symptoms: data,
        itemsCount: headers['x-total-count']
    };
}
