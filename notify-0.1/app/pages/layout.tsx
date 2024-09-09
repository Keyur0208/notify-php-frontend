import DefaultLayout from "../../componets/Layouts/DefaultLayout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <DefaultLayout>
                {children}
            </DefaultLayout>
        </>
    )
}