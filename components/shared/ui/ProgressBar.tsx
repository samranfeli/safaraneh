type Props ={
    className?: string;
    percentage: number;
    containerColor ?:string;
    barColor ?:string;
}

const ProgressBar:React.FC<Props> = props => (
<div 
    className={`h-2.5 rounded-lg bg bg-neutral-200 overflow-hidden ${props.className || ""}`} 
    style={{backgroundColor:props.containerColor || ""}}
>
    <div
        className='h-2.5 bg-primary-800'
        style={{
            width:props.percentage+"%",
            backgroundColor: props.barColor || ""
        }}
    />

</div>
);

export default ProgressBar;


