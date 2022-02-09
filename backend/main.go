package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/controller"
	actor "github.com/sut64/team01/controller/actor"
	"github.com/sut64/team01/entity"
	"github.com/sut64/team01/middlewares"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// DormAtten Routes
			protected.GET("/route/ListDormAttens", actor.ListDormAttens)
			protected.GET("/route/GetDormAtten/:id", actor.GetDormAtten)

			protected.PATCH("/route/UpdateDormAtten", actor.UpdateDormAtten)
			protected.DELETE("/route/DeleteDormAtten/:id", actor.DeleteDormAtten)
			// DormTenant Routes
			protected.GET("/route/ListDormTenants", actor.ListDormTenants)
			protected.GET("/route/GetDormTenant/:id", actor.GetDormTenant)

			protected.PATCH("/route/UpdateDormTenant", actor.UpdateDormTenant)
			protected.DELETE("/route/DeleteDormTenant/:id", actor.DeleteDormTenant)
			//  Carrier Routes
			protected.GET("/route/ListCarriers", controller.ListCarriers)
			protected.GET("/route/GetCarrier/:id", controller.GetCarrier)
			protected.POST("/route/CreateCarrier", controller.CreateCarrier)

			//  Postal Routes
			protected.GET("/route/ListPostals", controller.ListPostals)
			protected.GET("/route/GetPostal/:id", controller.GetPostal)
			protected.POST("/route/CreatePostal", controller.CreatePostal)

			//  Postal_Record Routes
			protected.GET("/route/ListPostalRecords", controller.ListPostalRecords)
			protected.GET("/route/GetPostalRecord/:id", controller.GetPostalRecord)
			protected.POST("/route/CreatePostalRecord", controller.CreatePostalRecord)
			//  Room type Routes
			protected.GET("/route/ListRoomTypes", controller.ListRoomtypes)
			protected.GET("/route/GetRoomType/:id", controller.GetRoomtype)
			protected.POST("/route/CreateRoomType", controller.CreateRoomtype)
			//  Room Routes
			protected.GET("/route/ListRooms", controller.ListRooms)
			protected.GET("/route/GetRoom/:id", controller.GetRoom)
			protected.POST("/route/CreateRoom", controller.CreateRoom)
			//  Postal_Record Routes
			protected.GET("/route/ListRoomAllocates", controller.ListRoomAllocate)
			protected.GET("/route/GetRoomAllocate/:id", controller.GetRoomAllocate)
			protected.POST("/route/CreateRoomAllocate", controller.CreateRoomAllocate)
			//=============== เพิ่มมา =================
			//  Postal_Record Routes
			protected.GET("/route/ListBills", controller.ListBills)
			protected.GET("/route/GetBill/:id", controller.GetBill)
			protected.POST("/route/CreateBill", controller.CreateBill)
			//=============== เพิ่มมา =================
			// Repair_request Routes
			protected.GET("/route/ListRepairRequest", controller.ListRepairRequest)
			protected.GET("/route/GetRepairRequest:id", controller.GetRepairRequest)
			protected.POST("/route/CreateRepairRequest", controller.CreateRepairRequest)

			// RepairType ประเภทการแจ้งซ่อม อย่าลบอีกนะ			
			protected.GET("/route/ListRepairtype", controller.ListRepairtype)
			protected.GET("/route/GetRepairtype:id", controller.GetRepairtype)
			protected.POST("/route/CreateRepairtype", controller.CreateRepairtype)

			// DormInventoryType
			protected.GET("/route/ListDormInventoryType", controller.ListDormInventoryType)
			protected.GET("/route/GetDormInventoryType:id", controller.GetDormInventoryType)
			protected.POST("/route/CreateDormInventoryType", controller.CreateDormInventoryType)

			//route cleaningrequrest/cleaningrequrest--------major
			protected.GET("/route/GetCleaningrequrest/:id", controller.GetCleaningrequrest)
			protected.GET("/route/ListCleaningrequrest", controller.ListCleaningrequrests)
			protected.POST("/route/CreateCleaningrequrest", controller.CreateCleaningrequrest)
			//route Cleaningtype/Cleaning_System
			protected.GET("/route/GetCleaningtype/:id", controller.GetCleaningtype)
			protected.GET("/route/ListCleaningtype", controller.ListCleaningtypes)
			//route Timerequrest/Cleaning_System
			protected.GET("/route/GetTimerequrest/:id", controller.GetTimerequrest)
			protected.GET("/route/ListTimerequrest", controller.ListTimerequrests)
			//  Unitprice Routes
			protected.GET("/route/GetUnitprice/:id", controller.GetUnitprice)
			protected.POST("/route/CreateUnitprice", controller.CreateUnitprice)
			//  MeterRecord Routes
			protected.GET("/route/ListMeterRecords", controller.ListMeterRecords)
			protected.GET("/route/GetMeterRecord/:id", controller.GetMeterRecord)
			protected.POST("/route/CreateMeterRecord", controller.CreateMeterRecord)

			//route DormInventory/FurnitureRequest
			protected.GET("/route/GetDormInventory/:id", controller.GetDormInventory)
			protected.GET("/route/ListDormInventory", controller.ListDormInventory)
			//route FurnitureRequest
			protected.GET("/route/GetFurnitureRequest/:id", controller.GetFurnitureRequest)
			protected.GET("/route/ListFurnitureRequest", controller.ListFurnitureRequest)
			protected.POST("/route/CreateFurnitureRequest", controller.CreateFurnitureRequest)

		}
	}
	//Actor Route
	r.POST("/route/CreateDormAtten", actor.CreateDormAtten)
	r.POST("/route/CreateDormTenant", actor.CreateDormTenant)
	//Login Actor
	r.POST("/login/DormTenant", actor.LoginDormTenant)
	r.POST("/login/DormAtten", actor.LoginDormAtten)
	// Run the server
	r.Run()
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
