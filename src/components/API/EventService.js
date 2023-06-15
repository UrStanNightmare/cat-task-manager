import axios from "axios";
import {formatDate} from "../dateUtils";
import Dayz from "dayz";
import moment from "moment";
import {changeEventStatus, setEventsArray} from "../../redux/actions";

const URL = 'http://localhost:8080/api/v1';
export default class EventService {

    static async addEvent(date, text) {
        const dateString = date.toISOString().split('T')[0];

        try {
            const response = await axios.post(URL + '/task',
                {
                    date: dateString,
                    description: text,
                    isDone: false
                });
            return response.data
        } catch (e) {
            console.log(e)
        }

        return {}
    }

    static async changeEventStatus(event) {
        const eventId = event.attributes.id

        const response = await axios.post(
            URL + "/task/" + eventId + "/changeDoneState"
        )
    }

    static async updateEvents(date, dispatch) {
        const dateString = formatDate(date);

        const response = await axios.get(URL + "/tasks",
            {
                params: {
                    date: dateString
                }
            }).then(r => {

            const events = new Dayz.EventsCollection(
                r.data.tasks.map(v => {
                        return {
                            id: v.id,
                            content: v.description,
                            range: moment.range(new Date(v.date), new Date(v.date)),
                            done: v.done
                        }
                    }
                )
            )

            dispatch(setEventsArray(events))
        });
    }

    static async removeEvent(event){
        const eventId = event.attributes.id

        const response = await axios.delete(
            URL + "/task/" + eventId + "/delete"
        )
    }
}