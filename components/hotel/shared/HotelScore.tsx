import { useTranslation } from "next-i18next";

type Props = {
    className?: string;
    reviews?: number;
    score?: number;
}

const HotelScore: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { score, reviews } = props;

    if (!(score && reviews && reviews > 0)) {
        return null;
    }

    let pointTitle: string = "";
    let pointColor: string = "";

    if (score >= 90) {
        pointTitle = t("excellent");
        pointColor = "rgb(20, 148, 15)";
    } else if (score >= 80) {
        pointTitle = t("very-good");
        pointColor = "rgb(108, 191, 74)";
    } else if (score >= 70) {
        pointTitle = t("good");
        pointColor = "rgb(163, 205, 77)";
    } else if (score >= 50) {
        pointTitle = t("fair");
        pointColor = "rgb(243, 163, 36)";
    } else {
        pointTitle = t("bad");
        pointColor = "#FF5722";
    }

    return (
        <div className={` ${props.className || ""}`}>
            {score} از 100 {pointTitle} ({props.reviews} {t("guest-reviews")}) 
        </div>
    )
};

export default HotelScore;