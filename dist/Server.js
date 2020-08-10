/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/loader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Api/Aplication.js":
/*!*******************************!*\
  !*** ./src/Api/Aplication.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const db = __webpack_require__(/*! ../DataBase/Control */ \"./src/DataBase/Control.js\");\n\nmodule.exports.authentication = async (req, res) => {\n  let {\n    username,\n    password\n  } = req.query;\n  username = username.replace(/[.,-\\s]/g, ''); // username vai ser o numero contrato\n\n  password = password.replace(/[.,-\\s]/g, ''); // vai ser o CPF do cliente.\n\n  const selectQuery = `SELECT \n                            c.* \n                        FROM contracts c \n                            INNER JOIN people p on p.id = c.client_id \n                        WHERE c.contract_number = '${username}' \n                            AND p.tx_id = '${password}'`;\n  db.select(selectQuery, function (err, result) {\n    if (!result.length) return res.send({\n      \"access\": false,\n      \"subscriber_id\": \"\",\n      //ID único por usuario\n      \"country_code\": \"\"\n    });\n    return res.send({\n      \"access\": true,\n      \"subscriber_id\": result[0].contract_number,\n      //ID único por usuario\n      \"country_code\": 'BR'\n    });\n  });\n};\n\nmodule.exports.authorizationService = async (req, res) => {\n  const {\n    subscriber_id,\n    country_code,\n    resource_id,\n    action_id,\n    ip_address\n  } = req.query;\n  let serviceId;\n\n  switch (resource_id) {\n    case 'urn:tve:noggin':\n      // id Noggin\n      serviceId = '2572';\n      break;\n\n    case 'urn:tve:paramountplus':\n      // id Noggin\n      serviceId = '2571';\n      break;\n  }\n\n  const selectQuery = `SELECT\n                            ci.*\n                        FROM contract_items ci \n                            INNER JOIN contracts c ON c.id = ci.contract_id AND c.status IN (1)\n                        WHERE c.contract_number = ${subscriber_id}\n                            AND ci.deleted = 0\n                            AND ci.service_product_id = ${serviceId}`;\n  db.select(selectQuery, function (err, result) {\n    if (!result.length) return res.status(404).send({\n      \"access\": false\n    });\n    return res.status(200).send({\n      \"access\": true,\n      \"rating\": \"G\",\n      \"ttl\": 3600\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/Api/Aplication.js?");

/***/ }),

/***/ "./src/Config/Cors.js":
/*!****************************!*\
  !*** ./src/Config/Cors.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (req, res, next) {\n  res.header('Access-Control-Allow-Origin', '*');\n  res.header('Access-Control-Allow-Methods', 'GET, POST');\n  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');\n  next();\n};\n\n//# sourceURL=webpack:///./src/Config/Cors.js?");

/***/ }),

/***/ "./src/Config/Router.js":
/*!******************************!*\
  !*** ./src/Config/Router.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const api = __webpack_require__(/*! ../Api/Aplication */ \"./src/Api/Aplication.js\");\n\nmodule.exports = function (router) {\n  router.get('/authentication', api.authentication);\n  router.get('/authorizationService', api.authorizationService);\n};\n\n//# sourceURL=webpack:///./src/Config/Router.js?");

/***/ }),

/***/ "./src/DataBase/Connection.js":
/*!************************************!*\
  !*** ./src/DataBase/Connection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mysql = __webpack_require__(/*! mysql */ \"mysql\");\n\nconst connection = mysql.createConnection({\n  host: '177.52.245.161',\n  user: 'cliente_s',\n  password: 'T?JVFu=fc35@',\n  database: 'dbemp00250'\n});\nmodule.exports = connection;\n\n//# sourceURL=webpack:///./src/DataBase/Connection.js?");

/***/ }),

/***/ "./src/DataBase/Control.js":
/*!*********************************!*\
  !*** ./src/DataBase/Control.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const con = __webpack_require__(/*! ./Connection */ \"./src/DataBase/Connection.js\");\n\nconst select = async (sqlQuery, callback) => {\n  con.query(sqlQuery, (error, res) => {\n    if (error) throw error;\n    callback(null, res);\n  });\n};\n\nmodule.exports = {\n  select\n};\n\n//# sourceURL=webpack:///./src/DataBase/Control.js?");

/***/ }),

/***/ "./src/Server/Server.js":
/*!******************************!*\
  !*** ./src/Server/Server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst server = express();\nconst router = express.Router();\nconst port = process.env.PORT || 8080;\n\nconst cors = __webpack_require__(/*! ../Config/Cors.js */ \"./src/Config/Cors.js\");\n\nserver.use(cors);\nserver.listen(port, () => console.log(`http://177.126.240.61:${port}`));\nserver.use('/api', router);\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/Server/Server.js?");

/***/ }),

/***/ "./src/loader.js":
/*!***********************!*\
  !*** ./src/loader.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const server = __webpack_require__(/*! ./Server/Server */ \"./src/Server/Server.js\");\n\n__webpack_require__(/*! ./Config/Router */ \"./src/Config/Router.js\")(server);\n\n//# sourceURL=webpack:///./src/loader.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mysql\");\n\n//# sourceURL=webpack:///external_%22mysql%22?");

/***/ })

/******/ });