import axios from "./axios";
import {apiRoutes} from "../constants";
import {IConsultationDiagnosis, IDiagnosis, IDiagnosisCreate} from "../types/diagnosis";

export const getDiagnosis = async ({queryKey}) => {
    const params = {
        page: queryKey[2].page,
        size: queryKey[2].size
    }
    const {data, headers} = await axios.get<IDiagnosis[]>(
        `${apiRoutes.DIAGNOSIS}/consultation/${queryKey[1]}`,
        {params}
    );
    return {
        diagnosis: data,
        itemsCount: headers['x-total-count']
    };
}

export const getDiagnosisByPatientId = async ({queryKey}) => {
    const params = {
        page: queryKey[2].page,
        size: queryKey[2].size
    }
    const {data, headers} = await axios.get<IConsultationDiagnosis[]>(
        `${apiRoutes.DIAGNOSIS}/patient/${queryKey[1]}`,
        {params}
    );
    return {
        diagnosis: data,
        itemsCount: headers['x-total-count']
    };
}

export const findDiagnosis = async ({queryKey}) => {
    const {data} = await axios.get<IDiagnosis>(`${apiRoutes.DIAGNOSIS}/${queryKey[1]}`);
    return data;
}

export const createDiagnosis = async (diagnosis: IDiagnosisCreate) => {
    const {data} = await axios.post<IDiagnosis>(apiRoutes.DIAGNOSIS, diagnosis);
    return data;
}

export const updateDiagnosis = async (diagnosis: IDiagnosis) => {
    const {data} = await axios.put<IDiagnosis>(apiRoutes.DIAGNOSIS, diagnosis);
    return data;
}
