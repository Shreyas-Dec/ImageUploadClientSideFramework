import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(private httpClient: HttpClient) { }

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  digitNumber:any;
  binaryNumber:any;

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }


  onUpload() {
    console.log(this.selectedFile);
    
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    localStorage.setItem("1", this.selectedFile.name);
  
    debugger
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

   
    getImage() {
    let imageName = localStorage.getItem("1");
    this.httpClient.get('http://localhost:8080/image/get/' + imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  getBinary(){
    debugger   
    this.httpClient.get('http://localhost:8080/image/convert/' + this.digitNumber)
      .subscribe(
        
        res => {
          this.binaryNumber=res;
          
       
        }
      );

  }
}
