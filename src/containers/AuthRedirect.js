import AuthNavigator from "src/navigation/AuthNavigator";
import TabNavigator from "src/navigation/TabNavigator";
import AuthContext from "../hooks/login-signup/AuthContext";
import { useContext } from "react";
import { DataProvider } from "../../src/hooks/data/DataContext";
import OnBoard from "src/screens/OnBoardingScreens/OnBoard.js";
export default function AuthRedirect() {
    const { auth, firstTime } = useContext(AuthContext);
    return (
        <>
            {firstTime ? <OnBoard /> :
                <>
                    {!auth && <AuthNavigator />}
                    {auth &&
                        <DataProvider>
                            <TabNavigator />
                        </DataProvider>
                    }
                </>
            }
        </>
    )
}