import {format} from "date-fns";
import parse from "date-fns/parse"
import ru from "date-fns/locale/ru";

export default class TimeUtils {
    static createDateString(date) {
        const dateString = format(date, "iiii, do MMMM", {locale: ru})
        return dateString.charAt(0).toLocaleUpperCase("ru")
            + dateString.slice(1)
    }

    static createShortDateString(date) {
        return format(date, "yyyy-MM-dd", {locale: ru})
    }

    static dateFromString(string) {
        return parse(string, "yyyy-MM-dd", new Date(), {locale: ru})
    }
}
