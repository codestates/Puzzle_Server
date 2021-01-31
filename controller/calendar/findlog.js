const {
    isAuthorized
} = require('../tokenFunctions')
const { calendar, user } = require('../../models')
module.exports = async (req, res) => {
    const verifiedToken = isAuthorized(req)
    const { year, month, day } = req.params
    console.log(req.params)
    if (!verifiedToken) {
        res.status(401).json({ "error": "not authorized" })
    } else {
        const calendarInfo = await calendar.findAll({
            raw: true,
            where: {
                year: year,
                month: month,
                day: day,
                userId: verifiedToken.id
            }
        })
        console.log(calendarInfo)
        if (!calendarInfo) {
            res.status(404).json({ "error": "can't find logs" })
        } else {
            res.status(200).json({ "data": calendarInfo })
        }
    }
}