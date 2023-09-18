import axios from "axios";
import DateUtils from "../utils/dateUtils";

let URL = process.env.REACT_APP_API_URL;

if (URL === undefined){
    URL = 'http://localhost:8080'
}
export default class EventService {
    static isFirstConnectionDone = false
    static async tryToLogIn() {
        if (localStorage.getItem('rT') !== null){
            return await this.#doRefreshToken(localStorage.getItem('rT'))
        }else{
            return await this.#doLogIn()
        }
    }

    static #doRefreshToken(token){
        return axios.post(URL + '/auth/token',
            {
                refreshToken: token
            }
        ).then(r => {
                localStorage.setItem('aT', r.data.accessToken)
                localStorage.setItem('rT', r.data.refreshToken)
                this.isFirstConnectionDone = true
                return true
            }
        ).catch(error => {
            return this.#doLogIn()
        })
    }

    static #doLogIn(){
        const username = window.prompt("Username", null)
        const password = window.prompt("Password", null)

        if (username == null || password == null){
            console.warn("Empty username or password")
            return Promise.resolve()
        }

        return axios.post(URL + '/auth/signin',
            {
                username: username,
                password: password
            }
        ).then(r => {
                localStorage.setItem('aT', r.data.accessToken)
                localStorage.setItem('rT', r.data.refreshToken)
                this.isFirstConnectionDone = true
                return true
            }
        ).catch(error => {
            console.warn('Auth failed')
            return null
        })
    }

    static async addEvent(date, text) {
        const dateString = DateUtils.createShortDateString(date)
        return await axios.post(URL + '/api/v2/task',
            {
                date: dateString,
                description: text,
                isDone: false
            },
            {
                headers: {
                    'Authorization' : "Bearer " + localStorage.getItem('aT')
                }
            }).then(r => true)
            .catch((error) => {
                console.warn('Event creation error!')
                return false
            });
    }

    static async isServerAvailable() {
        return await axios.get(URL + '/api/v2/health', {
            headers: {
                'Authorization' : "Bearer " + localStorage.getItem('aT')
            }
        })
            .then(r => {
                return true;
            }).catch((error) => {
                return false;
            })
    }

    static async getEventsFromServer(date) {
        const dateString = DateUtils.createShortDateString(date);

        if (!this.isFirstConnectionDone){
            return Promise.resolve()
        }

        return await axios.get(URL + "/api/v2/tasks",
            {
                headers: {
                    'Authorization' : "Bearer " + localStorage.getItem('aT')
                },
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
                        isDone: v.isDone
                    }
                })
            )
        }).catch((error) => {
            console.warn('Failed to get events from server!')
            return []
        });
    }

    static async changeEventStatus(id) {
        console.log(localStorage.getItem('aT'))
        return await axios.post(
            URL + "/api/v2/task/" + id + "/status", null, {
                headers: {
                    'Authorization' : "Bearer " + localStorage.getItem('aT')
                }
            }
        ).then(r => true)
            .catch((error) => {
                console.warn('Failed to change event status!')
                return false;
            })
    }

    static async deleteEvent(id) {
        return await axios.delete(
            URL + "/api/v2/task/" + id + "/", {
                headers: {
                    'Authorization' : "Bearer " + localStorage.getItem('aT')
                }
            }
        ).then(r => true)
            .catch((error) => {
                console.warn('Event deletion error')
                return false
            })
    }
}
