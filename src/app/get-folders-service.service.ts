import { Injectable } from '@angular/core';
import { Folders } from './edit-menu/EditMenuComponents/FolderClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetFoldersServiceService {
  currentPerantId: number = 0;
  forldes: Folders[] = [];
  IDnumber:number =0;

  private _items: BehaviorSubject<Array<Folders>> = new BehaviorSubject(new Array<Folders>());
  
  public readonly items: Observable<Array<Folders>> = this._items.asObservable();

  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(null)
  public readonly loading: Observable<boolean> = this._loading.asObservable();

  constructor(private http:HttpClient) {
    if (this.forldes){
      this.forldes = this.build_folder_arry();
    }
    this.Refresh(0)
    
    // for (var index = 0; index < 24; index++) {
    //   var newFolder = new Folders();
    //   newFolder.Position = index;
    //   newFolder.Text = "מוצר - " + index;
    //   if(index.toString().includes("2")){
    //     newFolder.Type = "Folder";
    //   }else if(index.toString().includes("3")){
    //     newFolder.Type = "Empty";
    //     newFolder.Price = null;
    //     newFolder.Text = null;
    //   }else{
    //     newFolder.Type = "Item";
    //     newFolder.Price = index;
    //   }

    //   this.forldes.push(newFolder);   
    // }
   }

   public GetFolders(parent){
    var forldes = this.build_folder_arry()
       this.forldes.filter(folder => {
        if (folder.Perant == parent){
         forldes[folder.Position] = folder;
        }
      });

     return forldes;
   }

   public Refresh(parent){
     this._loading.next(true)
    var forldes = this.build_folder_arry()
    this.http.get('https://us-central1-bring-112b3.cloudfunctions.net/GetFolderItems?folder=' + parent )
    .subscribe(data => {
      console.log(data);
      this.forldes = this.build_folder_arry()
      if (data["status"]){
        console.log(data["items"]);
        
        var num = 0
        data["items"].forEach(f => {
          var tmp:Folders = new Folders();
          tmp.Color = f.color;
          tmp.Text = f.name;
          tmp.IdNumber =f.id;
          tmp.Position = f.position;
          tmp.Perant = f.father_id;
          tmp.Type = f.type,
          tmp.PriceWeb = f.price,
          tmp.PriceDalpak= f.price_dalpak,
          this.forldes[f.position] = tmp;
          
        });
      }
      //  this.http.get('https://us-central1-bring-112b3.cloudfunctions.net/GetFolderItems?folder=' + parent )
      //  .subscribe(data => {
      //     console.log(data["items"]);
      //    // this.forldes = this.build_folder_arry()
      //     var num = 0
      //     data["items"].forEach(f => {
      //       var tmp:Folders = new Folders();
      //       tmp.Color = f.color;
      //       tmp.Text = f.name;
      //       tmp.IdNumber =f.id;
      //       tmp.Position = f.position;
      //       tmp.Perant = f.father_id;
      //       tmp.Type = "items"
      //       this.forldes[f.position] = tmp;
           
      //     });
      //   });
       
       this._items.next(this.forldes)
       this._loading.next(false)
       this.forldes.filter(folder => {
        if (folder.Perant == parent){
         forldes[folder.Position] = folder;
        }
      });
    })
  }

   public NewFolder(text,color){
    var newFolder = new Folders();
    newFolder.Perant = this.currentPerantId;
    
    newFolder.Type = "Folder";
    newFolder.Color = color;
    newFolder.Position = this.get_next_position(this.currentPerantId);
    newFolder.Text = text ;
    newFolder.IdNumber = this.getIDnumber();

    var body =  '{  "name": "'+ text + '","color": "' + color +'","business": "1", "father_id": "' + this.currentPerantId +'" ,"position": "' + this.get_next_position(this.currentPerantId) + '" }'
    this.http.post("https://us-central1-bring-112b3.cloudfunctions.net/AddNewFolder" ,body).subscribe(data => {
      console.log(data)
      this.Refresh(this.currentPerantId)
    })

    // // this.forldes = this.GetFolders(this.currentPerantId)
    // // this.forldes[newFolder.Position] = newFolder;
    // this.forldes[newFolder.IdNumber] = newFolder;
    // console.log("New folder :" + newFolder.Text )
    // console.log(this.forldes)
    // return this.forldes;
  }
  public NewItem(text,priceWeb,priceDalpak,type){
    console.log(this.forldes)
    var newFolder = new Folders();
    newFolder.Perant = this.currentPerantId;
    newFolder.Type = "Item";
    newFolder.Color = this.forldes[this.currentPerantId].Color;
    newFolder.Position = this.get_next_position(this.currentPerantId);
    newFolder.Text = text ;
    newFolder.IdNumber = this.getIDnumber();
    newFolder.PriceWeb = priceWeb;
    newFolder.PriceDalpak = priceDalpak;
    var body =  '{  "name": "'+ text + '","business": "1", "parent_folder": "' + this.currentPerantId +'" ,"position": "' + this.get_next_position(this.currentPerantId) +
     '","web_price":"'+ priceWeb +'","dalpak_price":"'+ priceDalpak +'","type":"' + type + '" }'
    this.http.post("https://us-central1-bring-112b3.cloudfunctions.net/AddNewItem" ,body).subscribe(data => {
      console.log(data)
      this.Refresh(this.currentPerantId)
    })
    // // this.forldes = this.GetFolders(this.currentPerantId)
    // // this.forldes[newFolder.Position] = newFolder;
    // this.forldes[newFolder.IdNumber] = newFolder;
    // console.log("New Item :" + newFolder.Text )
    // console.log(this.forldes)
    // return this.forldes;
  }
  

  public DeleteFolder(Position:number){
    // var tmp:Folders = new Folders()
    // tmp.Type = "Empty";
    // tmp.Position = Position;
    // this.forldes[Position]= tmp;
    // return this.forldes;

    var body =  '{"business_id": "1", "folder_id": "' + Position +'"}'
    this._loading.next(true);
    this.http.post("https://us-central1-bring-112b3.cloudfunctions.net/DeleteFolder" ,body).subscribe(data => {
      console.log(data)
      this.Refresh(this.currentPerantId)
    })
  }
  public DeleteItem(Position:number){
    var tmp:Folders = new Folders()
    tmp.Type = "Empty";
    tmp.Position = Position;
    this.forldes[Position]= tmp;
    return this.forldes;
  }
  

  get_next_position(parent){
   return this.GetFolders(parent).find(folder => folder.Type === "Empty" ).Position
  

   
  }

  build_folder_arry(){
    var forldes:Folders[] = [];
    for (var index = 0; index < 25; index++) {
      var newFolder = new Folders();
      newFolder.Position = index;
      newFolder.Type = "Empty";
      newFolder.PriceWeb = null;
      newFolder.PriceDalpak = null;
      newFolder.Text = null;
      forldes.push(newFolder);   
    }
    return forldes;
  }

  public getIDnumber(){
   this.IDnumber++;
   return this.IDnumber;
  }

  SetCurrentFolderId(num){
    this.currentPerantId = num;
  }

  getFolderFromID(ID){
    //return this.forldes[ID];
    return this.GetFolders(this.currentPerantId).find(folder => folder.IdNumber === ID );
  }

  UpdateFolder(ID,text,color,position){
    // this.forldes[ID].Text = text;
    // this.forldes[ID].Color = color;
    this._loading.next(true);
    var body =  '{  "name": "'+ text + '","color": "' + color +'","business": "1", "folder": "' + ID +'" ,"position": "' + position + '" }'
    this.http.post("https://us-central1-bring-112b3.cloudfunctions.net/EditFolder" ,body).subscribe(data => {
      console.log(data)
      this.Refresh(this.currentPerantId)
    })

  }
  UpdateItem(ID,text,priceWeb,priceDalpak){
    this.forldes[ID].Text = text;
    this.forldes[ID].PriceWeb = priceWeb;
    this.forldes[ID].PriceDalpak = priceDalpak;
  }

  ReplaePosition(Item1:Folders,Item2:Folders){
    // this.forldes[ID].Text = text;
    // this.forldes[ID].Color = color;
    this._loading.next(true);
    if(Item1.Type != "Empty"){
      var body =  '{  "name": "'+ Item1.Text + '","color": "' + Item1.Color +'","business": "1", "folder": "' + Item1.IdNumber +'" ,"position": "' + Item1.Position + '" }'
      this.http.post("https://us-central1-bring-112b3.cloudfunctions.net/EditFolder" ,body).subscribe(data => {
        console.log(data)
        if(Item2.Type != "Empty"){
          var body =  '{  "name": "'+ Item2.Text + '","color": "' + Item2.Color +'","business": "1", "folder": "' + Item2.IdNumber +'" ,"position": "' + Item2.Position + '" }'
          this.http.post("https://us-central1-bring-112b3.cloudfunctions.net/EditFolder" ,body).subscribe(data => {
            console.log(data)
            
          })  
        }
        this.Refresh(this.currentPerantId)
      })
    }else{
      if(Item2.Type != "Empty"){
        var body =  '{  "name": "'+ Item2.Text + '","color": "' + Item2.Color +'","business": "1", "folder": "' + Item2.IdNumber +'" ,"position": "' + Item2.Position + '" }'
        this.http.post("https://us-central1-bring-112b3.cloudfunctions.net/EditFolder" ,body).subscribe(data => {
          console.log(data)
          if(Item1.Type != "Empty"){
            var body =  '{  "name": "'+ Item1.Text + '","color": "' + Item1.Color +'","business": "1", "folder": "' + Item1.IdNumber +'" ,"position": "' + Item1.Position + '" }'
            this.http.post("https://us-central1-bring-112b3.cloudfunctions.net/EditFolder" ,body).subscribe(data => {
              console.log(data)
              
            })
          }
          this.Refresh(this.currentPerantId)
        })
  
      }
    }

  }


  public NewTosefet(ID,text,priceWeb,priceDalpak){
    console.log(this.forldes)
    var newFolder = new Folders();
    newFolder.Perant = ID;
    newFolder.Type = "Tosefet";
    newFolder.Color = this.forldes[this.currentPerantId].Color;
    newFolder.Position = this.get_next_position(this.currentPerantId);
    newFolder.Text = text ;
    newFolder.IdNumber = this.getIDnumber();
    newFolder.PriceWeb = priceWeb;
    newFolder.PriceDalpak = priceDalpak;
    // this.forldes = this.GetFolders(this.currentPerantId)
    // this.forldes[newFolder.Position] = newFolder;
    this.forldes[newFolder.IdNumber] = newFolder;
    console.log("New Tosefet :" + newFolder.Text )
    console.log(this.forldes)
    return this.forldes;
  }

  public GetTosefet(parent){
    var forldes:Folders[] = [];
     this.forldes.filter(folder => {
       if (folder.Perant == parent){
        forldes.push(folder);
       }
     });
     return forldes;
   }

   DeleteTosefet(ID){
    var tmp:Folders = new Folders()
    tmp.Type = "Empty";
    tmp.Position = ID;
    this.forldes[ID]= tmp;
    return this.forldes;
   }
   
   GetData(){

    var headers = new HttpHeaders();
    headers.append('Content-Type', 'image/jpeg');
    var a = headers.get('Content-Type'); // Returns 'image/jpeg'
    // this.http.get('http://api.bringit.org.il/?apiCtrl=dalpak&do=getAllFolders&business_id=1',{ withCredentials: true })
    this.http.get('http://api.bringit.org.il/?apiCtrl=dalpak&do=getAllFolders&business_id=1',{ withCredentials: true })
    .subscribe(data => {
      console.log(data);
    })
   }

  
}
