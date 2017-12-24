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
    var forldes = this.build_folder_arry()
    this.http.get('https://us-central1-bring-112b3.cloudfunctions.net/GetFolders')
    .subscribe(data => {
       console.log(data["folders"]);
       this.forldes = this.build_folder_arry()
       var num = 0
       data["folders"].forEach(f => {
         var tmp:Folders = new Folders();
         tmp.Color = f.color;
         tmp.Text = f.name;
         tmp.IdNumber =f.id;
         tmp.Position = f.position;
         tmp.Perant = f.father_id;
         tmp.Type = "Folder"
         this.forldes[f.position] = tmp;
        
       });
       this._items.next(this.forldes)
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
    // this.forldes = this.GetFolders(this.currentPerantId)
    // this.forldes[newFolder.Position] = newFolder;
    this.forldes[newFolder.IdNumber] = newFolder;
    console.log("New folder :" + newFolder.Text )
    console.log(this.forldes)
    return this.forldes;
  }
  public NewItem(text,price){
    console.log(this.forldes)
    var newFolder = new Folders();
    newFolder.Perant = this.currentPerantId;
    newFolder.Type = "Item";
    newFolder.Color = this.forldes[this.currentPerantId].Color;
    newFolder.Position = this.get_next_position(this.currentPerantId);
    newFolder.Text = text ;
    newFolder.IdNumber = this.getIDnumber();
    newFolder.Price = price;
    // this.forldes = this.GetFolders(this.currentPerantId)
    // this.forldes[newFolder.Position] = newFolder;
    this.forldes[newFolder.IdNumber] = newFolder;
    console.log("New Item :" + newFolder.Text )
    console.log(this.forldes)
    return this.forldes;
  }
  

  public DeleteFolder(Position:number){
    var tmp:Folders = new Folders()
    tmp.Type = "Empty";
    tmp.Position = Position;
    this.forldes[Position]= tmp;
    return this.forldes;
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
      newFolder.Price = null;
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
    return this.forldes[ID];
  }

  UpdateFolder(ID,text,color){
    this.forldes[ID].Text = text;
    this.forldes[ID].Color = color;
  }
  UpdateItem(ID,text,price){
    this.forldes[ID].Text = text;
    this.forldes[ID].Price = price;
  }


  public NewTosefet(ID,text,price){
    console.log(this.forldes)
    var newFolder = new Folders();
    newFolder.Perant = ID;
    newFolder.Type = "Tosefet";
    newFolder.Color = this.forldes[this.currentPerantId].Color;
    newFolder.Position = this.get_next_position(this.currentPerantId);
    newFolder.Text = text ;
    newFolder.IdNumber = this.getIDnumber();
    newFolder.Price = price;
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
