import { useAppSelector } from "@/hooks/use-store";
import Image from "next/image";
import Skeleton from "./ui/Skeleton";

type Props = {
    className?: string;
}
const Logo: React.FC<Props> = props => {

    const portalInfo = useAppSelector(state => state.portal.Phrases);
    const logo = portalInfo.find(item => item.Keyword === "Logo")?.ImageUrl;
    const siteName = portalInfo.find(item => item.Keyword === "Name")?.Value;

    if (logo) {
        return (
            <Image src={logo} alt={siteName} width={115} height={48} className={props.className} />
        )
    }
    return (
        <Skeleton className="h-10 w-28" />
    )
}

export default Logo;