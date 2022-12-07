import {useQuery} from "react-query";
import {getSymptomsByPatientId} from "../../api/symptom";

export const useFindPatientSymptoms = (patientUserId, size?, page?) => {
    return useQuery(["symptoms", patientUserId, {size, page}], getSymptomsByPatientId, {
        enabled: !!patientUserId
    })
}
