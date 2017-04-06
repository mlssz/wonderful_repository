let express = require("express")
let router = express.Router()
exports.router = router
exports.path = "/"

/**
 * @apiDefine NormalSuccess
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 */

/**
 * @apiDefine ParamsError
 *
 * @apiError (Error 400) {String} error 详细的错误信息
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "error": "Your parameters are wrong."
 *     }
 */

/**
 * @apiDefine MaterialKeys
 *
 * @apiSuccess {Number} id                   物资编号
 * @apiSuccess {Number} type                 物资类型
 * @apiSuccess {String} description          物资描述
 * @apiSuccess {Date} import_time            入库时间
 * @apiSuccess {Date} estimated_export_time  估计出库时间
 * @apiSuccess {Number}   height             物资高度，该系统中固定为1
 * @apiSuccess {Number}   width              物资宽度，该系统中固定为1
 * @apiSuccess {Number}   length             物资长度，该系统中固定为1
 * @apiSuccess {Number} repository_id        储存仓库的id
 * @apiSuccess {Number} location_id          仓库中位置的id
 * @apiSuccess {Number} status               状态码，详见https://mlssz.github.io/DocsV2/dev_docs/db_design/index.html
 * @apiSuccess {ObjectId[]} migrations  物资搬运记录的id
 * @apiSuccess {Date} location_update_time   位置更新时间
 */

/**
 * @api {get} /materials/ 获取所有物资信息
 * @apiName GetAllMaterial
 * @apiGroup Material
 * @apiDescription 返回一个元素为material对象的数组，以下的字段是数组中对象的键值
 *
 * @apiUse MaterialKeys
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *        "id": 1,
 *        "type": 3,
 *        "description": "materials Sample",
 *        "import_time": 1491446853931,
 *        "estimated_export_time": 1491446853931,
 *        "height": 1,
 *        "width": 1,
 *        "length": 1,
 *        "repository_id": 2,
 *        "location_id": 4,
 *        "status": 300,
 *        "mirgrations": [],
 *        "location_update_time": 1491446853931
 *     }, ... ]
 */
router.get("/materials/", (req, res, next) => res.status(501).end())

/**
 * @api {get} /repositories/:id/materials/ 特定仓库所有物资
 * @apiName GetAllMaterial
 * @apiGroup Material
 * @apiDescription 返回一个元素为material对象的数组，以下的字段是数组中对象的键值
 *
 * @apiParam   {Number} id                   仓库id
 *
 * @apiUse MaterialKeys
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *        "id": 1,
 *        "type": 3,
 *        "description": "materials Sample",
 *        "import_time": 1491446853931,
 *        "estimated_export_time": 1491446853931,
 *        "height": 1,
 *        "width": 1,
 *        "length": 1,
 *        "repository_id": 2,
 *        "location_id": 4,
 *        "status": 300,
 *        "mirgrations": [],
 *        "location_update_time": 1491446853931
 *     }, ... ]
 */
router.get("/repositories/:id/materials/", (req, res, next) => res.status(501).end())

/**
 * @api {get} /material/:id/                 特定物资
 * @apiName GetAllMaterial
 * @apiGroup Material
 *
 * @apiParam   {Number} id                   物资id
 *
 * @apiUse MaterialKeys
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id": 1,
 *        "type": 3,
 *        "description": "materials Sample",
 *        "import_time": 1491446853931,
 *        "estimated_export_time": 1491446853931,
 *        "height": 1,
 *        "width": 1,
 *        "length": 1,
 *        "repository_id": 2,
 *        "location_id": 4,
 *        "status": 300,
 *        "mirgrations": [],
 *        "location_update_time": 1491446853931
 *     }
 */
router.get("/material/:id/", (req, res, next) => res.status(501).end())


/**
 * @api {post} /materials/ 创建一个物资
 * @apiName ImportMaterial
 * @apiGroup Material
 * @apiDescription 入库时输入物资信息
 *
 * @apiUse NormalSuccess
 * @apiUse ParamsError
 */
router.post("/materials/", (req, res, next) => res.status(501).end())

router.patch("/", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({"value": result})
})
router.delete("/", (req, res, next) => {
  let result = req.body["value"] || "none"
  res.json({"value": result})
})
