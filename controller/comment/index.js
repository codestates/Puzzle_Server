import create from "./create";
import remove from "./remove";
import update from "./update";
import read from "./read"

const commentController = {
    create: create,
    read: read,
    update: update,
    remove: remove,
}

export default commentController