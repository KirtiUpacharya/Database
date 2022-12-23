const express=require('express')
const router=express.Router()
const upload=require('../middleware/upload')
const Employeecontroller=require('../controllers/EmployeeController')
const authenticate=require('../middleware/authenticate')

router.get('/',authenticate,Employeecontroller.index)
router.post('/show',Employeecontroller.show)
//router.post('/store',upload.single('avatar'),Employeecontroller.store)// to load single file
router.post('/store',upload.array('avatar[]'),Employeecontroller.store)
router.post('/update',Employeecontroller.update)
router.post('/delete',Employeecontroller.delete)

module.exports=router;