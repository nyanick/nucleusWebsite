import axios from "../api/axios";
import { apiRoutes } from "../constants";
import {IPrescription, IPrescriptionCreate} from "../types/prescription";

interface Props {
    authToken: string
    consultationId: string
    setLoading?: (state: boolean) => void
    setItemsCount?: (count: number) => void
    setDeleted?: (deleted: boolean) => void
    setCreatePrescription?: (creating: boolean) => void
    setDeletePrescription?: (creating: boolean) => void
    setUpdatePrescription?: (updating: boolean) => void
    setLoadingError?: (error: any) => void
    setCreatePrescriptionError?: (error: any) => void
    setUpdatePrescriptionError?: (error: any) => void
    setDeletePrescriptionError?: (error: any) => void
    setPrescription?: (prescription: IPrescription) => void
    setUpdatedPrescription?: (updatedPrescription: IPrescription) => void
    setCreatedPrescription?: (createdPrescription: IPrescription) => void
    setPrescriptions?: (prescription: IPrescription[]) => void
}

export class PrescriptionService {

    private readonly authToken: string
    private readonly consultationId: string
    private readonly setPrescription?: (prescription: IPrescription) => void
    private readonly setUpdatedPrescription?: (updatedPrescription: IPrescription) => void
    private readonly setCreatedPrescription?: (createdPrescription: IPrescription) => void
    private readonly setLoading?: (loading: boolean) => void
    private readonly setItemsCount?: (count: number) => void
    private readonly setDeleted?: (deleted: boolean) => void
    private readonly setPrescriptions?: (prescription: IPrescription[]) => void
    private readonly setLoadingError?: (error: any) => void
    private readonly setCreatePrescriptionError?: (error: any) => void
    private readonly setUpdatePrescriptionError?: (error: any) => void
    private readonly setDeletePrescriptionError?: (error: any) => void
    private readonly setCreatePrescription?: (creating: boolean) => void
    private readonly setUpdatePrescription?: (updating: boolean) => void
    private readonly setDeletePrescription?: (deleting: boolean) => void

    constructor({
                    authToken,
                    consultationId,
                    setLoading,
                    setItemsCount,
                    setDeleted,
                    setCreatePrescription,
                    setUpdatePrescription,
                    setDeletePrescription,
                    setLoadingError,
                    setCreatePrescriptionError,
                    setUpdatePrescriptionError,
                    setDeletePrescriptionError,
                    setPrescription,
                    setUpdatedPrescription,
                    setCreatedPrescription,
                    setPrescriptions
                }: Props) {
        this.authToken = authToken
        this.consultationId = consultationId
        this.setLoading = setLoading
        this.setItemsCount = setItemsCount
        this.setDeleted = setDeleted
        this.setLoadingError = setLoadingError
        this.setCreatePrescriptionError = setCreatePrescriptionError
        this.setUpdatePrescriptionError = setUpdatePrescriptionError
        this.setDeletePrescriptionError = setDeletePrescriptionError
        this.setPrescription = setPrescription
        this.setUpdatedPrescription = setUpdatedPrescription
        this.setCreatedPrescription = setCreatedPrescription
        this.setPrescriptions = setPrescriptions
        this.setCreatePrescription = setCreatePrescription
        this.setUpdatePrescription = setUpdatePrescription
        this.setDeletePrescription = setDeletePrescription
    }

    getAll() {
        this.setLoading(true)
        axios.get<IPrescription[]>(
            `${apiRoutes.CONSULTATIONS}/prescriptions/consultation/${this.consultationId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setItemsCount(parseInt(res.headers['x-total-count']));
            this.setPrescriptions(res.data);
            this.setLoading(false);
        }).catch((err) => {
            this.setLoading(false);
            this.setLoadingError(err.response)
        });
    }

    get(prescriptionId: string) {
        if (this.setLoading)
            this.setLoading(true)
        axios.get<IPrescription>(
            `${apiRoutes.CONSULTATIONS}/prescriptions/${prescriptionId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setPrescription(res.data);
            this.setLoading(false);
        }).catch((err) => {
            if (this.setLoading)
                this.setLoading(false)
            this.setLoadingError(err.response)
        });
    }

    create(prescriptionCreate: IPrescriptionCreate) {
        if (this.setCreatePrescription)
            this.setCreatePrescription(true)
        axios.post<IPrescription>(
            `${apiRoutes.CONSULTATIONS}/prescriptions`,
            prescriptionCreate,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setCreatedPrescription(res.data);
            this.setCreatePrescription(false);
        }).catch((err) => {
            if (this.setCreatePrescription)
                this.setCreatePrescription(false)
            this.setCreatePrescriptionError(err.response)
        });
    }

    update(prescription: IPrescription) {
        if (this.setUpdatePrescription)
            this.setUpdatePrescription(true)
        axios.put<IPrescription>(
            `${apiRoutes.CONSULTATIONS}/prescriptions`,
            prescription,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setUpdatedPrescription(res.data);
            this.setUpdatePrescription(false);
        }).catch((err) => {
            if (this.setUpdatePrescription)
                this.setUpdatePrescription(false)
            this.setUpdatePrescriptionError(err.response)
        });
    }

    delete(prescriptionId: string) {
        if (this.setDeletePrescription)
            this.setDeletePrescription(true)
        axios.delete<IPrescription>(
            `${apiRoutes.CONSULTATIONS}/prescriptions/${prescriptionId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setDeleted(true);
            this.setDeletePrescription(false);
        }).catch((err) => {
            if (this.setDeletePrescription)
                this.setDeletePrescription(false)
            this.setDeletePrescriptionError(err.response)
        });
    }
}