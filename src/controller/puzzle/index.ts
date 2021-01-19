import read from "../comment/read"
import create from "../home/create"
import remove from "../home/remove"
import update from "../home/update"

const puzzleController = {
    create: create,
    read: read,
    update: update,
    remove: remove,
}

export default puzzleController