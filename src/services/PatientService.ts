import axios from "../api/axios";
import {IPatient, IPatientWithDetails} from "../types/patient";

interface Props {
    authToken: string
    setLoading?: (state: boolean) => void
    setLoadingError?: (error: any) => void
    setPatient?: (patient: IPatient) => void
}

export class PatientService {
    private readonly authToken: string
    private readonly setPatient?: (patient: IPatient) => void
    private readonly setLoadingError?: (error: any) => void
    private readonly setLoading?: (loading: boolean) => void

    constructor({authToken, setLoading, setLoadingError, setPatient}: Props) {
        this.authToken = authToken
        this.setLoading = setLoading
        this.setLoadingError = setLoadingError
        this.setPatient = setPatient
    }

    findByUserId(userId: string) {
        if (this.setLoading)
            this.setLoading(true)
        axios.get<IPatientWithDetails>(
            `/patients/${userId}/details`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setPatient(res.data);
            this.setLoading(false);
        }).catch((err) => {
            if (this.setLoading)
                this.setLoading(false)
            this.setLoadingError(err.response)
        });
    }

    findByPatientId(patientId: string) {
        if (this.setLoading)
            this.setLoading(true)
        axios.get<IPatient>(
            `/patients/${patientId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setPatient(res.data);
            if (this.setLoading)
                this.setLoading(false);
        }).catch((err) => {
            if (this.setLoading)
                this.setLoading(false)
            this.setLoadingError(err.response)
        });
    }
}