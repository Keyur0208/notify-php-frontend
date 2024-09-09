'use client'
import { Provider } from "react-redux"
import store from "../../src/store/store"
import { SnackbarProvider } from "notistack";

export default function Redux_Provider({ children }: { children: React.ReactNode }) {
    return (
        <SnackbarProvider maxSnack={3}>
            <Provider store={store} >
                {children}
            </Provider>
        </SnackbarProvider>
    )
}

