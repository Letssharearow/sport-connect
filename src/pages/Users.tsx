import {IRootState} from "../data/models";
import {useDispatch, useSelector} from "react-redux";
import {UsersPreview} from "../components/UsersPreview";
import {AppDispatch} from "../index";
import {fetchUsers, writeUser} from "../redux/asyncActions";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Geolocation, Position} from "@capacitor/geolocation";
import {isDispatchFulfilled} from "../utils/functions";
import {setUser} from "../redux/reducers";

const Users: React.FC = () => {

    const usersState = useSelector((state: IRootState) => state.datasetSlice.users);
    const userState = useSelector((state: IRootState) => state.datasetSlice.user);

    const filteredUsers = useMemo(() => {
        return usersState.filter(u => {
            return u.categories?.find(cat => userState?.categories?.includes(cat)) && u.uid !== userState?.uid
        });
    }, [userState])

    const dispatch = useDispatch<AppDispatch>();

    const refresh = (e: CustomEvent) => {
        dispatch(fetchUsers()).then(() => e.detail.complete());
    };

    const [loc, setLoc] = useState<Position | null>(null);

    useEffect(() => {
        Geolocation.getCurrentPosition().then(result => {
            console.log('result', result);
            if (userState) {
                let newUser = {
                    ...userState,
                    location: {longitude: result.coords.longitude, latitude: result.coords.latitude}
                };
                if (userState.uid) {
                    dispatch(writeUser(newUser)).then(e => {
                        if (isDispatchFulfilled(e)) {
                            dispatch(setUser(
                                newUser
                            ))
                        }
                    })
                } else {
                    dispatch(setUser(
                        newUser
                    ))
                }
            }
            setLoc(result)
        }).catch(err => console.log('err', err))
    }, []);

    return (
        <UsersPreview heading="Coole Leute in der Nähe" users={filteredUsers} refresh={refresh}/>
    );
};

export default Users;