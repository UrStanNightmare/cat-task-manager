import axios from "axios";
import DateUtils from "../utils/dateUtils";

const URL = 'https://catapi.urstannightmare.ru/api/v1';
export default class EventService {
    static async addEvent(date, text) {
        const dateString = DateUtils.createShortDateString(date)
        return await axios.post(URL + '/task',
            {
                date: dateString,
                description: text,
                isDone: false
            }).then(r => true)
            .catch((error) => {
                console.warn('Event creation error!')
                return false
            });
    }

    static async isServerAvailable() {
        return await axios.get(URL + '/health')
            .then(r => {
                return true;
            }).catch((error) => {
                return false;
            })
    }

    static async getEventsFromServer(date) {
        const dateString = DateUtils.createShortDateString(date);

        return await axios.get(URL + "/tasks",
            {
                params: {
                    date: dateString
                }
            }).then(r => {
            return (
                r.data.tasks.map(v => {
                    let date = new Date(Date.parse(v.date))
                    const userTimezoneOffset = Math.abs(date.getTimezoneOffset() * 60000);
                    date = new Date(date.getTime() - userTimezoneOffset);
                    return {
                        id: v.id,
                        description: v.description,
                        start: date,
                        end: date,
                        allDay: true,
                        isDone: v.done
                    }
                })
            )
        }).catch((error) => {
            console.warn('Failed to get events from server!')
            return []
        });
    }

    static async changeEventStatus(id) {
        return await axios.post(
            URL + "/task/" + id + "/changeDoneState"
        ).then(r => true)
            .catch((error) => {
                console.warn('Failed to change event status!')
                return false;
            })
    }

    static async deleteEvent(id) {
        return await axios.delete(
            URL + "/task/" + id + "/delete"
        ).then(r => true)
            .catch((error) => {
                console.warn('Event deletion error')
                return false
            })
    }
}