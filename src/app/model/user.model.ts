export class User{
    emailId:string;
    password:string;

    constructor(){
        this.emailId='';
        this.password='';
    }
}

export interface IUserModel {
    userId: number
    emailId: string
    password: string
    createdDate: string
    projectName: string
    fullName: string
    mobileNo: string
    extraId: number
  }
  
  export interface IResponseModel {
    message: string
    result: boolean
    data: any
  }

  export interface ISiteData {
    siteId: number
    clientId: number
    siteName: string
    siteCity: string
    siteAddress: string
    sitePinCode: string
    totalBuildings: number
    createdDate: string
  }

  export interface IBuildingData {
    buildingId: number
    siteId: number
    buildingName: string
    buildingManagerName: string
    contactNo: string
    siteName: string
  }

  export interface IFloorData {
    floorId: number
    buildingId: number
    floorNo: string
    isOperational: boolean
    totalParkingSpots: number
  }
  
  export interface IBookSpotRequest  {
    parkId: number
    floorId: number
    custName: string
    custMobileNo: string
    vehicleNo: string
    parkDate: Date
    parkSpotNo: number
    inTime: Date
    outTime: null
    amount: number
    extraCharge: number
    parkingNo: string
  }

  export interface IBookedSpot {
    parkId: number
    custName: any
    custMobileNo: string
    vehicleNo: string
    parkDate: string
    parkSpotNo: number
    inTime: string
    outTime: string
    amount: number
    extraCharge: number
    floorNo: string
    buildingName: string
    siteName: string
    parkingNo: string
    clientName: string
  }

  export interface IMarkExit {
    parkId: number
    outTime: Date
    extraCharge: number
  }
  
  