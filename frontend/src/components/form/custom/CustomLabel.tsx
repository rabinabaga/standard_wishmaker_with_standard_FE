interface Props{
    title:string;
}

const CustomLabel:React.FC<Props> = ({title}) => {
    return (<>
       <p>{title}</p>
    </>  );
}

export default CustomLabel;