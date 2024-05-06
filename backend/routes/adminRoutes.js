const express = require("express");
const { auth, isAdmin } = require("../middlewares/auth");
const { createInstance, createDatabase, pushDatabaseToInstance, getInstances, removeDatabase, assignAccessRoles, removeUser, removeAccessUserFromDatabase, addUser, createUser, fetchDatabases } = require("../controllers/AdminController");
const { changePassword, signUp } = require("../controllers/Auth");


const router = express.Router();


router.post("/create-instance",auth,isAdmin,createInstance);
router.post("/create-database",auth,isAdmin,createDatabase);
router.post("/push-database",auth,isAdmin,pushDatabaseToInstance);
router.post("/get-instances",auth,isAdmin,getInstances);
router.post("/fetch-databases",auth,isAdmin,fetchDatabases)
router.delete("/remove-database",auth,isAdmin,removeDatabase);
router.post("/assign-role",auth,isAdmin,assignAccessRoles);
router.post("/change-password",auth,isAdmin,changePassword);
router.delete("/remove-user",auth,isAdmin,removeUser);
router.post("/remove-access",auth,isAdmin,removeAccessUserFromDatabase);
router.post("/add-user",auth,isAdmin,addUser);
router.post("/create-user",auth,isAdmin,createUser);
module.exports = router;