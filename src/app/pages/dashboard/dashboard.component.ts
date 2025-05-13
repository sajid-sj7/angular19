import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IBookedSpot, IBookSpotRequest, IBuildingData, IFloorData, IMarkExit, IResponseModel, ISiteData } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { isNgContainer } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  siteList : ISiteData[]=[];
  builgingList : IBuildingData[]=[];
  floorList : IFloorData[]=[];
  masterSer= inject(MasterService);
  siteId: number=0;
  buildingId: number=0;
  florrId: number=0;
   parkingSpotArray : number[]=[];
   @ViewChild("bookSpot") bookModel !: ElementRef;
   @ViewChild("releaseSpot") releaseSpotModal !: ElementRef;
   bookSpotObj:IBookSpotRequest={
    parkId:0,
    floorId:0,
    custName:"",
    custMobileNo:"",
    vehicleNo:"",
    parkDate:new Date(),
    parkSpotNo:0,
    inTime:new Date(),
    outTime:null,
    amount:0,
    extraCharge:0,
    parkingNo:""
   };
   markExitObj : IMarkExit={
    parkId: 0,
    outTime :new Date(),
    extraCharge:0
   }
   bookedSpotList :IBookedSpot[]=[];

  ngOnInit(): void {
    this.getSites();
  }

  checkIfSpotisBooked(spotNo:number){
const isExist = this.bookedSpotList.find(m=>m.parkSpotNo==spotNo && m.outTime==null);
if (isExist !=undefined) {
  return isExist;
}else{
  return undefined;
}
  }
  openModel(spotNo:number){
    this.resetBookSpotObj(); 
    this.bookSpotObj.parkSpotNo=spotNo;
    this.bookSpotObj.floorId=this.florrId;
    if (this.bookModel) {
      this.bookModel.nativeElement.style.display='block'
    }
  }

  closeModel(){
    if (this.bookModel) {
      this.bookModel.nativeElement.style.display='none'
    }
  }
  openReleseModel(parkId:number){
    this.markExitObj.parkId=parkId;
    if (this.releaseSpotModal) {
      this.releaseSpotModal.nativeElement.style.display='block'
    }
  }

  closeReleseModel(){
    if (this.releaseSpotModal) {
      this.releaseSpotModal.nativeElement.style.display='none'
    }
  }
  onExitCar(){
    this.masterSer.releaseBookSpot(this.markExitObj).subscribe((res:IResponseModel)=>{
      alert("Spot Released"); 
      this.getBookings();
      this.closeReleseModel();
    })
  }


  onBookCall(){
    this.masterSer.bookSpot(this.bookSpotObj).subscribe((res:IResponseModel)=>{
      alert("spot booked"); 
      this.getBookings();
      this.closeModel();
    })
  }
  getSites(){
    
    this.masterSer.getSiteByClientId().subscribe((res:IResponseModel)=>{
      this.siteList= res.data;
    })
  }
  getBuilding(){
    this.parkingSpotArray=[];
    this.floorList=[];
    this.masterSer.getBuildingBySiteId(this.siteId).subscribe((res:IResponseModel)=>{
      this.builgingList=res.data;
    })
  }

  getFloorByBuilding(){
    this.parkingSpotArray=[];
    this.floorList=[];
    this.masterSer.getFloorsByBuildingId(this.buildingId).subscribe((res:IResponseModel)=>{
      this.floorList=res.data;
    })
  }

  onFloorSelect(){
    this.parkingSpotArray=[];
    this.bookedSpotList=[];
    const floor = this.floorList.find((m:IFloorData)=>m.floorId==this.florrId);
    if (!floor) {
      console.warn("Selected floor not found.");
      return;
    }
    for (let index = 1; index <= floor.totalParkingSpots; index++) {
      this.parkingSpotArray.push(index);
    }
    this.getBookings();
  }

  getBookings(){
    this.masterSer.GetAllParkingByFloor(this.florrId).subscribe((res:IResponseModel)=>{
      this.bookedSpotList=res.data;
    })
  }
  resetBookSpotObj() {
    this.bookSpotObj = {
      parkId: 0,
      floorId: 0,
      custName: "",
      custMobileNo: "",
      vehicleNo: "",
      parkDate: new Date(),
      parkSpotNo: 0,
      inTime: new Date(),
      outTime: null,
      amount: 0,
      extraCharge: 0,
      parkingNo: ""
    };
  }
}
