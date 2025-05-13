import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookSpotRequest, IMarkExit, IResponseModel } from '../model/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  userSer= inject(UserService);
  apiUrl : string = 'https://api.freeprojectapi.com/api/SmartParking/';
  constructor(private http: HttpClient) { }

  getSiteByClientId():Observable<IResponseModel>{
    const clientId = this.userSer.loggedUserData.extraId;
    return this.http.get <IResponseModel>(this.apiUrl+"GetSitesByClientId?id="+clientId)
  }

  getBuildingBySiteId(siteId:number):Observable<IResponseModel>{
    return this.http.get <IResponseModel>(`${this.apiUrl}GetBuildingBySiteId?id=${siteId}`)
  }
  
  
  getFloorsByBuildingId(buildingId:number):Observable<IResponseModel>{
    return this.http.get <IResponseModel>(`${this.apiUrl}GetFloorsByBuildingId?id=${buildingId}`)
  }
  
  
  bookSpot(data:IBookSpotRequest):Observable<IResponseModel>{
    return this.http.post <IResponseModel>(`${this.apiUrl}AddParking?id`,data)
  }

   
  releaseBookSpot(data:IMarkExit):Observable<IResponseModel>{
    return this.http.post <IResponseModel>(`${this.apiUrl}MarExit?id`,data)
  }
  GetAllParkingByFloor(floorId:number):Observable<IResponseModel>{
    return this.http.get <IResponseModel>(`${this.apiUrl}GetAllParkingByFloor?id=${floorId}`)
  }
  

}
