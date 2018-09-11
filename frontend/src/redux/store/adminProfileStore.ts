import {Immutable} from "immutable-typescript";
import { AdminProfile } from "./../../model/AdminProfile";

interface Store {
    adminProfile: AdminProfile;
}

type AdminProfileStore = Immutable<Store>;

export default AdminProfileStore;
