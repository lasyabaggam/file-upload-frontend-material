import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'file-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent {
  @Output() fetchFileContent: EventEmitter<any> = new EventEmitter();
  constructor(public fileService: FileService) {}
  
  ngOnInit() {
  }

  getFileContent(id: number): void {
    this.fetchFileContent.emit(id);
  }
}
