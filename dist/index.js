"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dataSource = require("./data-source");

// import { User } from "./entity/User"
_dataSource.AppDataSource.initialize().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(_dataSource.AppDataSource);

          _dataSource.AppDataSource.close(); // console.log("Inserting a new user into the database...")
          // const user = new User()
          // user.firstName = "Timber"
          // user.lastName = "Saw"
          // user.age = 25
          // await AppDataSource.manager.save(user)
          // console.log("Saved a new user with id: " + user.id)
          // console.log("Loading users from the database...")
          // const users = await AppDataSource.manager.find(User)
          // console.log("Loaded users: ", users)
          // console.log("Here you can setup and run express / fastify / any other framework.")


        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})))["catch"](function (error) {
  return console.log(error);
});