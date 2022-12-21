const express=require('express')
const router=express.Router()

const Employeecontroller=require('../controllers/EmployeeController')

router.get('/',Employeecontroller.index)
router.post('/show',Employeecontroller.show)
router.post('/store',Employeecontroller.store)
router.post('/update',Employeecontroller.update)
router.post('/delete',Employeecontroller.delete)

module.exports=router;