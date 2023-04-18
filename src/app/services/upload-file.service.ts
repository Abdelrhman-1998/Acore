import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private basePath = '/uploads';
  
  constructor( private storage: AngularFireStorage) { }
  async uploadFile(_file:File) {
    const onFileUpladed$:BehaviorSubject<string>=new BehaviorSubject<string>('');
    const file = _file;
    const filePath = `uploads/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    await this.storage.upload(filePath, file);
    const downloadUrl = await fileRef.getDownloadURL().toPromise();
    console.log("file uploaded!");
    return {downloadUrl:downloadUrl,filePath:filePath}
  }
}
