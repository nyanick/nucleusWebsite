import axios from "../api/axios";
import {IUser} from "../types/user";

interface Props {
    authToken: string
    setLoading?: (state: boolean) => void
    setLoadingError?: (error: any) => void
    setUser?: (user: IUser) => void
    setUsers?: (users: IUser[]) => void
}

export class UserService {

    private readonly authToken: string
    private readonly setUser?: (user: IUser) => void
    private readonly setUsers?: (users: IUser[]) => void
    private readonly setLoadingError?: (error: any) => void
    private readonly setLoading?: (loading: boolean) => void

    constructor({authToken, setLoading, setLoadingError, setUser, setUsers}: Props) {
        this.authToken = authToken
        this.setLoading = setLoading
        this.setLoadingError = setLoadingError
        this.setUser = setUser
        this.setUsers = setUsers
    }

    getAll() {
        this.setLoading(true)
        axios.get<IUser[]>(
            "/users",
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setUsers(res.data);
            this.setLoading(false);
        }).catch((err) => {
            this.setLoading(false);
            this.setLoadingError(err.response)
        });
    }

    get(userId: string) {
        this.setLoading(true)
        axios.get<IUser>(
            `/users/${userId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setUser(res.data);
            this.setLoading(false);
        }).catch((err) => {
            this.setLoading(false);
            this.setLoadingError(err.response)
        });
    }
}