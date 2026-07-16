interface Props {
    children: React.ReactNode;
}

export function AppPageContainer({ children }: Props){
    return (
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
    )
}