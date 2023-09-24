import axios from "../api/axios";
import { apiRoutes } from "../constants";
import {IDoctor, IDoctorWithDetails} from "../types/doctor";

interface Props {
    authToken: string
    setLoading?: (state: boolean) => void
    setLoadingError?: (error: any) => void
    setDoctor?: (doctor: IDoctor) => void
}

export class DoctorService {
    private readonly authToken: string
    private readonly setDoctor?: (doctor: IDoctor) => void
    private readonly setLoadingError?: (error: any) => void
    private readonly setLoading?: (loading: boolean) => void

    constructor({authToken, setLoading, setLoadingError, setDoctor}: Props) {
        this.authToken = authToken
        this.setLoading = setLoading
        this.setLoadingError = setLoadingError
        this.setDoctor = setDoctor
    }

    findByUserId(userId: string) {
        if (this.setLoading)
            this.setLoading(true)
        axios.get<IDoctor>(
            `${apiRoutes.DOCTORS}/user/${userId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setDoctor(res.data);
            this.setLoading(false);
        }).catch((err) => {
            if (this.setLoading)
                this.setLoading(false)
            this.setLoadingError(err.response)
        });
    }
}
