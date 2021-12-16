import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY } from "../assets/styles";
import {AuthContext} from "../login/AuthContext";

const Logout = () => {
    const { signOut } = React.useContext(AuthContext);

    return <TouchableOpacity onPress={signOut} style={styles.filters}>
        <Text style={styles.filtersText}>
            <Icon name="log-out" size={13} color={DARK_GRAY} /> Sign out
        </Text>
    </TouchableOpacity>
};

export default Logout;
