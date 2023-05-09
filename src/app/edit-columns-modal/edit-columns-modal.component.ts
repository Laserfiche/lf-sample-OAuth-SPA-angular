import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { LfLocalizationService} from '@laserfiche/lf-js-utils';
import { ColumnDef } from '@laserfiche/types-lf-ui-components';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InjectSetupWrapper } from '@angular/core/testing';


const resources: Map<string, object> = new Map<string, object>([
  ['en-US', {
    'OK': 'Ok',
    'CANCEL': 'Cancel',
    'ADD_REMOVE_COLUMNS': 'Add/Remove Columns',
  }],
  ['es-MX', {
    'OK': 'Ok - Spanish',
    'CANCEL': 'Cancel - Spanish',
    'ADD_REMOVE_COLUMNS': 'Add/Remove Columns - Spanish',
  }]
]);

interface EditColumnsDialogData {
  columnsSelected: ColumnDef[];
  allColumnOptions: ColumnDef[];
  updateColumns: (columns: ColumnDef[]) => void;
}

@Component({
  selector: 'app-edit-columns-modal',
  templateUrl: './edit-columns-modal.component.html',
  styleUrls: ['./edit-columns-modal.component.css']
})

export class EditColumnsModalComponent implements OnInit {
  localizationService: LfLocalizationService = new LfLocalizationService(resources);

  OK = this.localizationService.getString('OK');
  CANCEL = this.localizationService.getString('CANCEL');
  ADD_REMOVE_COLUMNS = this.localizationService.getString('ADD_REMOVE_COLUMNS');

  @Output() columnEmitter: EventEmitter<ColumnDef[]> = new EventEmitter<ColumnDef[]>();
  @Output() shouldCloseModal: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    public dialogRef: MatDialogRef<EditColumnsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditColumnsDialogData,
  ) { }

  ngOnInit(): void {
  }

  async closeDialog(columns?: ColumnDef[]) {
    if (columns){
      this.data.updateColumns(columns);
    }
    this.dialogRef.close(columns);
  }

  onCheckboxChange(column: ColumnDef) {
    if (this.data.columnsSelected.includes(column)) {
      this.data.columnsSelected = this.data.columnsSelected.filter(c => c != column);
    } else {
      this.data.columnsSelected.push(column);
    }
  }

}
