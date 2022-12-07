import axios from "../api/axios";
import {IDiagnosis, IDiagnosisCreate} from "../types/diagnosis";

interface Props {
    authToken: string
    consultationId: string
    setLoading?: (state: boolean) => void
    setItemsCount?: (count: number) => void
    setDeleted?: (deleted: boolean) => void
    setCreateDiagnostic?: (creating: boolean) => void
    setDeleteDiagnostic?: (creating: boolean) => void
    setUpdateDiagnostic?: (updating: boolean) => void
    setLoadingError?: (error: any) => void
    setCreateDiagnosticError?: (error: any) => void
    setUpdateDiagnosticError?: (error: any) => void
    setDeleteDiagnosticError?: (error: any) => void
    setDiagnostic?: (diagnostic: IDiagnosis) => void
    setUpdatedDiagnostic?: (updatedDiagnostic: IDiagnosis) => void
    setCreatedDiagnostic?: (createdDiagnostic: IDiagnosis) => void
    setDiagnostics?: (diagnostic: IDiagnosis[]) => void
}

export class DiagnosticService {

    private readonly authToken: string
    private readonly consultationId: string
    private readonly setDiagnostic?: (diagnostic: IDiagnosis) => void
    private readonly setUpdatedDiagnostic?: (updatedDiagnostic: IDiagnosis) => void
    private readonly setCreatedDiagnostic?: (createdDiagnostic: IDiagnosis) => void
    private readonly setLoading?: (loading: boolean) => void
    private readonly setItemsCount?: (count: number) => void
    private readonly setDeleted?: (deleted: boolean) => void
    private readonly setDiagnostics?: (diagnostic: IDiagnosis[]) => void
    private readonly setLoadingError?: (error: any) => void
    private readonly setCreateDiagnosticError?: (error: any) => void
    private readonly setUpdateDiagnosticError?: (error: any) => void
    private readonly setDeleteDiagnosticError?: (error: any) => void
    private readonly setCreateDiagnostic?: (creating: boolean) => void
    private readonly setUpdateDiagnostic?: (updating: boolean) => void
    private readonly setDeleteDiagnostic?: (deleting: boolean) => void

    constructor({
                    authToken,
                    consultationId,
                    setLoading,
                    setItemsCount,
                    setDeleted,
                    setCreateDiagnostic,
                    setUpdateDiagnostic,
                    setDeleteDiagnostic,
                    setLoadingError,
                    setCreateDiagnosticError,
                    setUpdateDiagnosticError,
                    setDeleteDiagnosticError,
                    setDiagnostic,
                    setUpdatedDiagnostic,
                    setCreatedDiagnostic,
                    setDiagnostics
                }: Props) {
        this.authToken = authToken
        this.consultationId = consultationId
        this.setLoading = setLoading
        this.setItemsCount = setItemsCount
        this.setDeleted = setDeleted
        this.setLoadingError = setLoadingError
        this.setCreateDiagnosticError = setCreateDiagnosticError
        this.setUpdateDiagnosticError = setUpdateDiagnosticError
        this.setDeleteDiagnosticError = setDeleteDiagnosticError
        this.setDiagnostic = setDiagnostic
        this.setUpdatedDiagnostic = setUpdatedDiagnostic
        this.setCreatedDiagnostic = setCreatedDiagnostic
        this.setDiagnostics = setDiagnostics
        this.setCreateDiagnostic = setCreateDiagnostic
        this.setUpdateDiagnostic = setUpdateDiagnostic
        this.setDeleteDiagnostic = setDeleteDiagnostic
    }

    getAll() {
        this.setLoading(true)
        axios.get<IDiagnosis[]>(
            `/consultations/diagnosis/consultation/${this.consultationId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setItemsCount(parseInt(res.headers['x-total-count']));
            this.setDiagnostics(res.data);
            this.setLoading(false);
        }).catch((err) => {
            this.setLoading(false);
            this.setLoadingError(err.response)
        });
    }

    get(diagnosticId: string) {
        if (this.setLoading)
            this.setLoading(true)
        axios.get<IDiagnosis>(
            `/consultations/diagnosis/${diagnosticId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setDiagnostic(res.data);
            this.setLoading(false);
        }).catch((err) => {
            if (this.setLoading)
                this.setLoading(false)
            this.setLoadingError(err.response)
        });
    }

    create(diagnosticCreate: IDiagnosisCreate) {
        if (this.setCreateDiagnostic)
            this.setCreateDiagnostic(true)
        axios.post<IDiagnosis>(
            `/consultations/diagnosis`,
            diagnosticCreate,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setCreatedDiagnostic(res.data);
            this.setCreateDiagnostic(false);
        }).catch((err) => {
            if (this.setCreateDiagnostic)
                this.setCreateDiagnostic(false)
            this.setCreateDiagnosticError(err.response)
        });
    }

    update(diagnostic: IDiagnosis) {
        if (this.setUpdateDiagnostic)
            this.setUpdateDiagnostic(true)
        axios.put<IDiagnosis>(
            `/consultations/diagnosis`,
            diagnostic,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setUpdatedDiagnostic(res.data);
            this.setUpdateDiagnostic(false);
        }).catch((err) => {
            if (this.setUpdateDiagnostic)
                this.setUpdateDiagnostic(false)
            this.setUpdateDiagnosticError(err.response)
        });
    }

    delete(diagnosticId: string) {
        if (this.setDeleteDiagnostic)
            this.setDeleteDiagnostic(true)
        axios.delete<IDiagnosis>(
            `/consultations/diagnostics/${diagnosticId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setDeleted(true);
            this.setDeleteDiagnostic(false);
        }).catch((err) => {
            if (this.setDeleteDiagnostic)
                this.setDeleteDiagnostic(false)
            this.setDeleteDiagnosticError(err.response)
        });
    }
}