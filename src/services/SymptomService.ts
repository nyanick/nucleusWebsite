import axios from "../api/axios";
import { apiRoutes } from "../constants";
import {ISymptom} from "../types/symptom";

interface Props {
    authToken: string
    consultationId: string
    setLoading?: (state: boolean) => void
    setUpdatedSymptomsCount?: (count: number) => void
    setUpdateSymptoms?: (updating: boolean) => void
    setLoadingError?: (error: any) => void
    setUpdateSymptomsError?: (error: any) => void
    setUpdatedSymptoms?: (updatedSymptoms: ISymptom[]) => void
    setSymptoms?: (symptoms: ISymptom[]) => void
    setDefaultSymptoms?: (symptoms: ISymptom[]) => void
}

export class SymptomService {

    private readonly authToken: string
    private readonly consultationId: string
    private readonly setLoading?: (loading: boolean) => void
    private readonly setUpdatedSymptomsCount?: (count: number) => void
    private readonly setUpdateSymptoms?: (updating: boolean) => void
    private readonly setLoadingError?: (error: any) => void
    private readonly setUpdateSymptomsError?: (error: any) => void
    private readonly setUpdatedSymptoms?: (updatedSymptom: ISymptom[]) => void
    private readonly setSymptoms?: (symptom: ISymptom[]) => void
    private readonly setDefaultSymptoms?: (symptom: ISymptom[]) => void

    constructor({
                    authToken,
                    consultationId,
                    setLoading,
                    setUpdatedSymptomsCount,
                    setUpdateSymptoms,
                    setLoadingError,
                    setUpdateSymptomsError,
                    setUpdatedSymptoms,
                    setSymptoms,
                    setDefaultSymptoms
                }: Props) {
        this.authToken = authToken
        this.consultationId = consultationId
        this.setLoading = setLoading
        this.setUpdatedSymptomsCount = setUpdatedSymptomsCount
        this.setLoadingError = setLoadingError
        this.setUpdateSymptomsError = setUpdateSymptomsError
        this.setUpdatedSymptoms = setUpdatedSymptoms
        this.setSymptoms = setSymptoms
        this.setDefaultSymptoms = setDefaultSymptoms
        this.setUpdateSymptoms = setUpdateSymptoms
    }

    getAll() {
        this.setLoading(true)
        axios.get<ISymptom[]>(
            `${apiRoutes.CONSULTATIONS}/${this.consultationId}/symptoms`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setSymptoms(res.data);
            this.setLoading(false);
        }).catch((err) => {
            this.setLoading(false);
            this.setLoadingError(err.response)
        });
    }

    update(symptoms: ISymptom[]) {
        if (this.setUpdateSymptoms)
            this.setUpdateSymptoms(true)
        axios.put<ISymptom[]>(
            `${apiRoutes.CONSULTATIONS}/${this.consultationId}/symptoms`,
            symptoms,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setUpdatedSymptoms(res.data);
            this.setUpdatedSymptomsCount(res.data.length);
            this.setUpdateSymptoms(false);
        }).catch((err) => {
            if (this.setUpdateSymptoms)
                this.setUpdateSymptoms(false)
            this.setUpdateSymptomsError(err.response)
        });
    }
}