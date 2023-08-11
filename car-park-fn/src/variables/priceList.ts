import { Price } from "../features/models";

const priceList: Array<Price> = [
    {key: "hourly", timeslot: "時租", small: 19, middle: 40, motor: 19},
    {key: "day", timeslot: "日租", small: 105, middle: 200, motor: 105},
    {key: "night", timeslot: "夜租", small: 80, middle: 200, motor: 80}
]

export default priceList