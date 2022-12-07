import axios from "../api/axios";
import {IObservation, IObservationCreate} from "../types/observation";

interface Props {
    authToken: string
    consultationId: string
    setLoading?: (state: boolean) => void
    setDeleted?: (deleted: boolean) => void
    setCreateObservation?: (creating: boolean) => void
    setDeleteObservation?: (creating: boolean) => void
    setUpdateObservation?: (updating: boolean) => void
    setLoadingError?: (error: any) => void
    setCreateObservationError?: (error: any) => void
    setUpdateObservationError?: (error: any) => void
    setDeleteObservationError?: (error: any) => void
    setObservation?: (observation: IObservation) => void
    setUpdatedObservation?: (updatedObservation: IObservation) => void
    setCreatedObservation?: (createdObservation: IObservation) => void
    setObservations?: (observation: IObservation[]) => void
}

export class ObservationService {

    private readonly authToken: string
    private readonly consultationId: string
    private readonly setObservation?: (observation: IObservation) => void
    private readonly setUpdatedObservation?: (updatedObservation: IObservation) => void
    private readonly setCreatedObservation?: (createdObservation: IObservation) => void
    private readonly setLoading?: (loading: boolean) => void
    private readonly setDeleted?: (deleted: boolean) => void
    private readonly setObservations?: (observation: IObservation[]) => void
    private readonly setLoadingError?: (error: any) => void
    private readonly setCreateObservationError?: (error: any) => void
    private readonly setUpdateObservationError?: (error: any) => void
    private readonly setDeleteObservationError?: (error: any) => void
    private readonly setCreateObservation?: (creating: boolean) => void
    private readonly setUpdateObservation?: (updating: boolean) => void
    private readonly setDeleteObservation?: (deleting: boolean) => void

    constructor({
                    authToken,
                    consultationId,
                    setLoading,
                    setDeleted,
                    setCreateObservation,
                    setUpdateObservation,
                    setDeleteObservation,
                    setLoadingError,
                    setCreateObservationError,
                    setUpdateObservationError,
                    setDeleteObservationError,
                    setObservation,
                    setUpdatedObservation,
                    setCreatedObservation,
                    setObservations
                }: Props) {
        this.authToken = authToken
        this.consultationId = consultationId
        this.setLoading = setLoading
        this.setDeleted = setDeleted
        this.setLoadingError = setLoadingError
        this.setCreateObservationError = setCreateObservationError
        this.setUpdateObservationError = setUpdateObservationError
        this.setDeleteObservationError = setDeleteObservationError
        this.setObservation = setObservation
        this.setUpdatedObservation = setUpdatedObservation
        this.setCreatedObservation = setCreatedObservation
        this.setObservations = setObservations
        this.setCreateObservation = setCreateObservation
        this.setUpdateObservation = setUpdateObservation
        this.setDeleteObservation = setDeleteObservation
    }

    getAll() {
        this.setLoading(true)
        axios.get<IObservation[]>(
            `/consultations/observations/consultation/${this.consultationId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setObservations(res.data);
            this.setLoading(false);
        }).catch((err) => {
            this.setLoading(false);
            this.setLoadingError(err.response)
        });
    }

    get(observationId: string) {
        if (this.setLoading)
            this.setLoading(true)
        axios.get<IObservation>(
            `/consultations/observations/${observationId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setObservation(res.data);
            this.setLoading(false);
        }).catch((err) => {
            if (this.setLoading)
                this.setLoading(false)
            this.setLoadingError(err.response)
        });
    }

    create(observationCreate: IObservationCreate) {
        if (this.setCreateObservation)
            this.setCreateObservation(true)
        axios.post<IObservation>(
            `/consultations/observations`,
            observationCreate,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setCreatedObservation(res.data);
            this.setCreateObservation(false);
        }).catch((err) => {
            if (this.setCreateObservation)
                this.setCreateObservation(false)
            this.setCreateObservationError(err.response)
        });
    }

    update(observation: IObservation) {
        if (this.setUpdateObservation)
            this.setUpdateObservation(true)
        axios.put<IObservation>(
            `/consultations/observations`,
            observation,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setUpdatedObservation(res.data);
            this.setUpdateObservation(false);
        }).catch((err) => {
            if (this.setUpdateObservation)
                this.setUpdateObservation(false)
            this.setUpdateObservationError(err.response)
        });
    }

    delete(observationId: string) {
        if (this.setDeleteObservation)
            this.setDeleteObservation(true)
        axios.delete<IObservation>(
            `/consultations/observations/${observationId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setDeleted(true);
            this.setDeleteObservation(false);
        }).catch((err) => {
            if (this.setDeleteObservation)
                this.setDeleteObservation(false)
            this.setDeleteObservationError(err.response)
        });
    }
}