export const numberWithCommas = (x: number) => {
    if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        return "0";
    }
}

export const dateDiplayFormat = ({ date, format, locale }: { date: string; format?: "ddd dd mm" | "dd mm yyyy" | "yyyy/mm/dd", locale?: string }) : string => {
    
    if (!date) return "";
    
    const dateObject = new Date(date);
    const day = dateObject.toLocaleString(locale, { day: "numeric" });
    const weekDay = dateObject.toLocaleString(locale, { weekday: 'short' });
    const month = dateObject.toLocaleString(locale, { month: "long" });
    const day2digit = dateObject.toLocaleString(locale, { month: "2-digit" })
    const month2digit = dateObject.toLocaleString(locale, { month: "2-digit" });
    const year = dateObject.toLocaleString(locale, { year: "numeric" });


    if (format === "ddd dd mm") {
        return (`${weekDay} ${day} ${month}`)
    }

    if (format === "dd mm yyyy") {
        return (`${day} ${month} ${year}`)
    }

    if (format === "yyyy/mm/dd") {
        return (`${year}/${month2digit}/${day2digit}`)
    }

    return date;
}