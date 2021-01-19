import userController from './user'
import homeController from './home'
import projectController from './project'
import commentController from './comment'
import puzzleController from './puzzle'
const controller = {
  user: {
    login: userController.login,
    signup: userController.signup,
    logout: userController.logout,
    userinfo: userController.userinfo,
    google: userController.google,
    kakao: userController.kakao,

  },
  home: {
    home: homeController.home,
    search: homeController.search,
    create: homeController.create,
    update: homeController.update,
    remove: homeController.remove,

  },
  project: {
    id: projectController.id,
    create: projectController.create,
    invite: projectController.invite,
    setpuzzle: projectController.setpuzzle,
    update: projectController.update

  },
  comment: {
    create: commentController.create,
    read: commentController.read,
    update: commentController.update,
    remove: commentController.remove,

  },
  puzzle: {
    create: puzzleController.create,
    read: puzzleController.read,
    update: puzzleController.update,
    remove: puzzleController.remove,

  }

}

export default controller
