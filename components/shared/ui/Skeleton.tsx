type Props = {
    className?:string;
}

const Skeleton : React.FC<Props> = props => {
    return(
        <div className={`h-4 bg-neutral-100 rounded relative overflow-hidden ${props.className}`}>
            <span className="block absolute top-0 right-0 h-full w-full animate-skeleton bg-gradient-to-r from-transparent from-10% via-neutral-300/50 via-50% to-transparent to-90%" />
        </div>
    )
}

export default Skeleton;