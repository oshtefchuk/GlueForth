import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import {
  DxDataGridComponent,
  DxFormComponent,
  DxSelectBoxComponent,
  DxTagBoxComponent
} from "devextreme-angular";

import { IndicatorDataSetValueService, MapSetting } from "./indicator-data-set-value.service";
import { StandardsService } from "../../standards/standards.service";
import { UserService } from "../../../shared/services/user.service";
import { ReportingService } from "../../../shared/services/reporting.service";
import {IndicatorDataSet, IndicatorDatasetList, PrimaryDataField} from "../../../shared/models/indicatorDataSet.model";
import {Popup} from "../../../shared/models/popup";
import {MonthlyValuesPayload} from "../../../shared/models/performanseIndicator.model";


  @Component({
  selector: 'bluenorth-indicator-data-set-value',
  templateUrl: './indicator-data-set-value.component.html',
  styleUrls: ['./indicator-data-set-value.component.scss']
})
export class IndicatorDataSetValueComponent implements OnInit {
    @ViewChild('currentItem') currentItem: ElementRef;

    @ViewChild('dataTable') dataTable: DxDataGridComponent;
    @ViewChild('innerDataTable') innerDataTable: DxDataGridComponent;
    @ViewChild('monthlyDataTable') monthlyDataTable: DxDataGridComponent;
    @ViewChild('multySelector') multySelector: DxTagBoxComponent;
    @ViewChild('multySelectorForReview') multySelectorForReview: DxTagBoxComponent;
    @ViewChild('unitOMSelector') unitOMSelector: DxSelectBoxComponent;
    @ViewChild('templateContainer')
    private templateContainer: ElementRef;

    public currentUnitId: string;
    public indicatorDataSetList: IndicatorDatasetList[] = [];
    public selectedDatasets = [];
    public selectedDatasetsForReview = [];
    public testArray1: PrimaryDataField[] = [];
    public indicatorsForCurrentPrincipleGroup: PrimaryDataField[] = [];
    public buttonTextNotes = 'NOTES';
    public isNotesPopupVisible = false;
    public notes: any[] = [];
    public value = '';
    public currentUserFullName: string;
    public isIndicatorPopupVisible = false;
    public isSubmitForReviewPopupVisible = false;
    public indicatorGuidance: any = {};
    public principleGroupsForTableList: any = [];
    public dataSetOidArray = [];
    public isCreateDataSetPopupVisible = false;
    public newDataSet: IndicatorDataSet;
    public yearArrayFrom = [];
    public yearArrayTo = [];
    public maxPeriodByUnitFrom;
    public monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    public allowEdit = false;
    public isTrendChartPopupVisible = false;
    public trendInfo: any[] = [];
    public datasetsTitles: string[] = [];
    private isAddedColumns = false;
    public isShowConfirmationPopup: boolean = false;
    public currentDataSet: any = {};
    public selectedRowOid: number;
    public isIndicatorPopoverVisible: number;
    public periodFromMonth: any;
    public isMonthPeriodSetted: boolean = false;
    public isShowConfirmationDeleteNotePopup: boolean = false;
    private currentNote: any;
    private currentItemData: any;
    private updateNoteOid: number = -1;
    public periodToYear: any;
    public periodFromYear: any;
    public periodToMonth: any;
    public yaxisName: string;
    public loadingVisible: boolean = false;
    public selectBoxValues = [{name: 'Yes', value: true}, {name: 'No', value: false}];
    mapTypes: MapSetting[];
    mapProviders: MapSetting[];
    currentRowData: any;
    checkedDataSets = [];
    selectdataset = true;
    currentPopupTemplate;
    currentPopupConfig = new Popup();
    popupShow;
    monthlyData;
    monthlyPopupTitle;
    @ViewChild("periodFromYearSelector")
    public periodFromYearSelector: DxSelectBoxComponent;

    @ViewChild("periodToYearSelector")
    public periodToYearSelector: DxSelectBoxComponent;

    @ViewChild("periodToMonthSelector")
    public periodToMonthSelector: DxSelectBoxComponent;

    @ViewChild("periodFromMonthSelector")
    public periodFromMonthSelector: DxSelectBoxComponent;

    @ViewChild("dxForm")
    public dxForm: DxFormComponent;

    @ViewChild("createDataSetForm")
    public createDataSetForm: DxFormComponent;

    public isEditDataSetPopupVisible = false;
    public isShowConfirmationEditPopup = false;

    constructor(private standardsService: StandardsService,
                private indicatorDataSetValueService: IndicatorDataSetValueService,
                private reportingService: ReportingService,
                private userService: UserService) {
      this.newDataSet = {...this.standardsService.getNewDataSet()};
      this.mapTypes = indicatorDataSetValueService.getMapTypes();
      this.mapProviders = indicatorDataSetValueService.getMapProviders();
    }

    ngOnInit() {
      this.loadData();
    }

    loadData() {
      this.reportingService.getPrincipleGroups()
        .subscribe((principleGroups: any[]) => {
          principleGroups.map((principleGroups, index) => {
            this.principleGroupsForTableList.push({
              OID: principleGroups['OID'],
              Title: principleGroups['ShortTitle'],
              Index: index + 1
            });
          });
          this.getDataGridValue();
        });
    }

    getDataGridValue() {
      this.indicatorDataSetValueService.getIndicatorDataSetList()
        .subscribe((indicatorDataSetList: any) => {
          indicatorDataSetList.map((indicator, index) => {

            this.indicatorDataSetList.push({
              PeriodFrom: `${indicator.PeriodFromMonth < 10
                ? '0' + indicator.PeriodFromMonth : indicator.PeriodFromMonth}-${indicator.PeriodFromYear}/${indicator.PeriodToMonth < 10
                ? '0' + indicator.PeriodToMonth : indicator.PeriodToMonth}-${indicator.PeriodToYear}`,
              OID: indicator.OID,
              IsChecked: index > indicatorDataSetList.length - 6,
              PeriodFromYear: indicator.PeriodFromYear
            });

          });
          if (this.indicatorDataSetList.length > 0) {
            this.periodFromMonth = indicatorDataSetList[0].PeriodFromMonth < 10
              ? '0' + indicatorDataSetList[0].PeriodFromMonth.toString() : indicatorDataSetList[0].PeriodFromMonth.toString();
            this.periodToMonth = this.monthArray[this.monthArray.indexOf(this.periodFromMonth) - 1]
              ? this.monthArray[this.monthArray.indexOf(this.periodFromMonth) - 1] : this.monthArray[11];
            this.isMonthPeriodSetted = true;

            this.datasetsTitles = this.indicatorDataSetList
              .map(item => {
                return item.PeriodFrom
              });
            for (let i = 0; i < this.indicatorDataSetList.length; i++) {
              this.dataTable.instance.addColumn({
                caption: this.indicatorDataSetList[i].PeriodFrom,
                dataField: this.indicatorDataSetList[i].PeriodFrom,
                cellTemplate: "datasetTemplate",
                showEditorAlways: true,
                width: '115',
                visible: this.indicatorDataSetList[i].IsChecked
              });
              for (let j = 0; j < this.principleGroupsForTableList.length; j++) {
                this.dataTable.instance.cellValue(this.principleGroupsForTableList[j].Index,
                  this.indicatorDataSetList[i].PeriodFrom,
                  //this.indicatorDataSetList[i].PeriodFrom.substring(this.indicatorDataSetList[i].PeriodFrom.length - 4));
                  this.indicatorDataSetList[i].PeriodFromYear);
              }
            }
              if(this.principleGroupsForTableList.length) {
                this.getIndicatorsForCurrentPrincipleGroup(this.principleGroupsForTableList[0].OID)
                this.dataTable.instance.addColumn({
                  caption: 'ACTIONS',
                  cellTemplate: "actionsTemplate",
                  width: "260",
                });
                this.dataTable.instance.addColumn({
                  headerCellTemplate: "headerTemplate",
                  cellTemplate: "trendTemplate",
                  width: "50",
                });
              }

          } else {
            this.loadingVisible = false;
            this.dataTable.visible = false;
            this.isMonthPeriodSetted = false;
            this.periodFromMonth = this.monthArray[0];
            this.periodToMonth = this.monthArray[11];
          }
        });
    }


  getIndicatorsForCurrentPrincipleGroup(principleGroupOid) {
    this.dataTable.instance.beginCustomLoading('Loading..');

    this.dataSetOidArray = [];
    this.indicatorDataSetList.forEach(item => {
      this.dataSetOidArray.push(item.OID);
    });
    let queryParams = {
      "CategoryOid": principleGroupOid,
      "dataSetsOidList": this.dataSetOidArray
    };
    if (this.dataSetOidArray.length > 0) {
      this.indicatorDataSetValueService.getIndicatorsByPrincipleGroupAndDataset(queryParams)
        .subscribe((response: any) => {
            this.testArray1 = response.body;
          },
          error1 => {
            console.log(error1);
          },
          () => {
          this.indicatorsForCurrentPrincipleGroup = Object.assign([{}], this.testArray1);
              this.indicatorDataSetList.forEach((item) => {
                this.innerDataTable.instance.addColumn({
                  dataField: item.OID.toString(),
                  dataType: "number",
                  editCellTemplate: 'editNumberTemplate',
                  showEditorAlways: true,
                  allowEditing: true,
                  width: '115',
                  visible: item.IsChecked
                });

              });
            this.checkedDataSets = this.indicatorDataSetList.filter(el=> el.IsChecked);
              this.innerDataTable.instance.addColumn({
                dataField: "IndicatorNotesCount",
                editCellTemplate: "notesCellTemplate",
                width: "130",
                showEditorAlways: true,
                allowEditing: false,
              });
              this.innerDataTable.instance.addColumn({
                headerCellTemplate: "headerTemplate",
                editCellTemplate: "trendInnerTemplate",
                showEditorAlways: 'true',
                allowEditing: false,
                width: "130"
              });

              this.isAddedColumns = true;


            this.testArray1.forEach((item, index) => {
                let valuesForDatasets = []
                  this.checkedDataSets.forEach(e => {
                    let val = item.PrimaryDataValue.find(el => el.DataSetOid === e.OID);
                    if (val.Value === null) {
                      val.Value = '';
                    }
                    if(val){
                      valuesForDatasets.push(val)
                    }
                });

              item.PrimaryDataValue = valuesForDatasets
              },
              this.allowEdit = true);
            this.dataTable.instance.endCustomLoading();
            this.allowEdit = true;
            setTimeout( () => {
              this.selectdataset = true;
            });

          }
        );
    }
    }

    deleteDataSet(dataset) {
      this.currentDataSet = dataset;
      this.isShowConfirmationPopup = true;
    }

  confirmDeleteDataSet() {
    this.indicatorDataSetValueService.deleteDataset(this.currentDataSet.OID)
      .subscribe(data => {
        this.dataSetOidArray = [];
        this.indicatorDataSetList = [];
        this.testArray1 = [];
        this.principleGroupsForTableList = [];
        this.loadData();
        this.isShowConfirmationPopup = false;
        },
        (error1) => {
        this.userService.showUserNotification(error1.error.Message, 'error', 2000);
      });
  }

    cancelDelete() {
      this.isShowConfirmationPopup = false;
    }

    filterDataGrid(value) {
      let row = value.data;
      if (row) {
        //hide dependants rows
        if (row.PrimaryDataValue.every(function (obj, index) {
          return (obj.Value === '' || obj.Value === null || obj.Value === 'False' || !obj.Value);
        })) {
          let dependants = this.testArray1.filter(obj => {
            return obj.DependendonPrimaryDataFieldOid === row.PrimaryDataFieldOid;
          });
          dependants.forEach(dep => {
            let ind = this.testArray1.indexOf(dep);
            this.testArray1.splice(ind, 1);
          })
        } else { //show dependants rows
          let dependants = this.indicatorsForCurrentPrincipleGroup.filter(obj => {
            return obj.DependendonPrimaryDataFieldOid === row.PrimaryDataFieldOid;
          });
          dependants.forEach(dependant => {
            if (!this.testArray1.includes(dependant)) {
              let index = this.testArray1.indexOf(this.testArray1.find(obj => {
                return obj.PrimaryDataFieldOid === dependant.DependendonPrimaryDataFieldOid;
              }));
              this.testArray1.splice(index + 1, 0, dependant);
            }
          });
        }
      }
      return this.isDisabled(value);
    }

    isDisabled(value) {
      let row = this.testArray1.find(obj => {
        return obj.PrimaryDataFieldOid === value.data.DependendonPrimaryDataFieldOid;
      });
      if (row) {
        return row.PrimaryDataValue.find(function (obj, index) {
          if ((obj.Value === '' || obj.Value === null || obj.Value === 'False' || obj.Value === false) && (index === value.columnIndex - 2)) {
            return true;
          }
        });
      } else {
        return false;
      }
    }

    isDisabledCommodity(value) {
      let rowsByCommodity = this.testArray1.filter(obj => {
        return (obj.PrimaryDataFieldOid === value.data.PrimaryDataFieldOid) && (obj.CommodityOid !== 0);
      });
      return rowsByCommodity.length > 0 && value.data.CommodityOid === 0;
    }

    onValueChanged($event, data) {
      if($event.value != null)
      {        
      let row = this.testArray1.find(obj => {
        return (obj.PrimaryDataFieldOid === data.data.PrimaryDataFieldOid) && (obj.CommodityOid === data.data.CommodityOid);
      });
      row.PrimaryDataValue[data.columnIndex - 2].Value = $event.value;

      if (data.data.CommodityOid === 0) {
        let indicatorArray = [];
        let indicatorValue = {};
        indicatorValue = {
          "OID": data.data.PrimaryDataValue[data.columnIndex - 2].ValueOid,
          "Value": $event.value,
          "Dataset": data.data.PrimaryDataValue[data.columnIndex - 2].DataSetOid,
          "PrimaryDataField": data.data.PrimaryDataFieldOid
        }
        if (!indicatorValue['OID']) {
          indicatorValue['OID'] = 0;
        }
        indicatorArray.push(indicatorValue)
        this.indicatorDataSetValueService.createOrUpdatePrimaryDataValue(indicatorArray)
          .subscribe((data) => {
          })
      } else {
        let curValue;
        if (!$event.value && $event.value !== 0) {
          curValue = 0.0;
        } else {
          curValue = Number($event.value);
        }
        let indicatorCommodityValue = {};
        indicatorCommodityValue = {
          "PrimaryDataFieldOid": data.data.PrimaryDataFieldOid,
          "DataSetOid": data.data.PrimaryDataValue[data.columnIndex - 2].DataSetOid,
          "CommodityOid": data.data.CommodityOid,
          "Value": curValue
        }
        this.indicatorDataSetValueService.createOrUpdateCommodityPrimaryDataFieldValue(indicatorCommodityValue)
          .subscribe((data) => {
            },
            (error1 => console.log(error1)),
            () => {
              //count Row without Commodity
              let row = this.testArray1.find(obj => {
                return (obj.PrimaryDataFieldOid === data.data.PrimaryDataFieldOid) && (obj.CommodityOid === 0);
              });
              if ($event.previousValue) {
                row.PrimaryDataValue[data.columnIndex - 2].Value = Number(row.PrimaryDataValue[data.columnIndex - 2].Value) + Number($event.value) - Number($event.previousValue);
              } else {
                row.PrimaryDataValue[data.columnIndex - 2].Value = Number(row.PrimaryDataValue[data.columnIndex - 2].Value) + Number($event.value);
              }
            });
      }
    }
    }

  getUserName() {
    return `${this.userService.currentUser['FirstName']} ${this.userService.currentUser['LastName']}`;
  }

  contentRowReady(event) {
    if (!event.component.getSelectedRowKeys().length && this.selectedRowOid !== null)
      event.component.selectRowsByIndexes([0]);
  }

  selectCurrentRow(event?, itemIndex?) {
    this.testArray1 = []
    this.currentRowData = event ? event : this.currentRowData;
    if (itemIndex) {
      if (this.selectedRowOid && this.selectedRowOid === itemIndex.data.OID) {
        this.selectedRowOid = null;
        this.dataTable.instance.collapseAll(-1);
        this.dataTable.instance.deselectRows(this.dataTable.instance.getSelectedRowKeys());
      } else {
        this.dataTable.instance.selectRowsByIndexes(itemIndex.rowIndex);
      }
    } else if (this.currentRowData.currentSelectedRowKeys && this.currentRowData.currentSelectedRowKeys.length > 0) {
      this.currentRowData.component.collapseAll(-1);
      this.currentRowData.component.expandRow(this.currentRowData.currentSelectedRowKeys[0]);
      this.isAddedColumns = false;
      this.allowEdit = false;
      this.getIndicatorsForCurrentPrincipleGroup(this.currentRowData.currentSelectedRowKeys[0].OID);
      this.selectedRowOid = this.currentRowData.currentSelectedRowKeys[0].OID;
    }
  }

    showTrendChart(item) {
      setTimeout(() => {
        this.isTrendChartPopupVisible = true;
        this.yaxisName = item.data.Name;
      }, 0)
      this.trendInfo = null;
      this.trendInfo = item.data.PrimaryDataValue.map((item, index) => {
        return {
          Period: this.indicatorDataSetList[index].PeriodFrom,
          Value: +item.Value
        };
      });
    }

    toOpenNotes(event, data) {
      this.notes = [];
      this.isNotesPopupVisible = true;
      let dataSetOidArray = [];
      this.indicatorDataSetList.map(item => {
        dataSetOidArray.push(item.OID);
      });

      let paramsForNotes = {
        IndicatorOid: data.key,
        IndicatorDataSetOidList: dataSetOidArray
      };

      this.standardsService.getIndicatorsNotes(paramsForNotes)
        .subscribe((notes: any[]) => {
          this.notes = notes;
        });
    }

    addMessage(event, itemData) {
      if (this.value !== '') {
        let paramForAddNote;
        if (this.updateNoteOid && this.updateNoteOid != -1) {
          paramForAddNote =
            {
              PrimaryDataField: itemData.IndicatorOid,
              DataSet: itemData.IndicatorDataSetOid,
              Note: this.value,
              OID: this.updateNoteOid
            };
        } else {
          paramForAddNote = {
            PrimaryDataField: itemData.IndicatorOid,
            DataSet: itemData.IndicatorDataSetOid,
            Note: this.value
          };
        }
        this.standardsService.addIndicatorsNotes(paramForAddNote)
          .subscribe((response) => {
            this.testArray1.forEach(indicator => {
              if (indicator.PrimaryDataFieldOid === itemData.IndicatorOid) {
                indicator.IndicatorNotesCount++;
              }
            });
            let existingNoteIndex = itemData.Notes.findIndex(note => {
              return note.OID === response.body;
            });
            if (existingNoteIndex != -1) {
              itemData.Notes[existingNoteIndex] = {
                OID: response.body,
                Message: this.value,
                Created: new Date(),
                UserFullName: this.getUserName()
              };
            } else {
              itemData.Notes.push({
                OID: response.body,
                Message: this.value,
                Created: new Date(),
                UserFullName: this.getUserName()
              });
            }
            this.value = '';
            this.updateNoteOid = -1;
          });
      }
    }

    selectDatasetsForReview(event) {
      if (this.multySelectorForReview) {
        this.selectedDatasetsForReview = this.multySelectorForReview.selectedItems;
      }
    }

    toggleGuidancePopup(templateTitle) {
      if (templateTitle && templateTitle.data.Guidance) {
        this.isIndicatorPopoverVisible = templateTitle.rowIndex;
      } else {
        this.isIndicatorPopoverVisible = -1;
      }
    }

    upateDatasetsGrade() {
      let dataSetOidArray = [];
      this.selectedDatasetsForReview.map(item => {
        dataSetOidArray.push(item.OID);
      });

      this.indicatorDataSetValueService.updateGradeToUnderReviewState(dataSetOidArray)
        .subscribe(response => {
          this.userService.showUserNotification('Data Sets was submitted for review', 'success');
          for (let i = 0; i < this.selectedDatasets.length; i++) {
            dataSetOidArray.forEach(oid => {
              if (this.selectedDatasets[i].OID === oid) {
                this.selectedDatasets.splice(i, 1);
                this.selectedDatasetsForReview = [];
              }
            });
          }
          this.isSubmitForReviewPopupVisible = false;
          this.selectedDatasets = [];
          this.indicatorDataSetList = [];
          this.multySelector.value = null;
          this.indicatorDataSetValueService.getIndicatorDataSetList()
            .subscribe((indicatorDataSetList: any) => {
              indicatorDataSetList.map(indicator => {
                this.indicatorDataSetList.push({
                  PeriodFrom: `${indicator.PeriodFromMonth < 10
                    ? '0' + indicator.PeriodFromMonth : indicator.PeriodFromMonth}-${indicator.PeriodFromYear}/${indicator.PeriodToMonth < 10
                    ? '0' + indicator.PeriodToMonth : indicator.PeriodToMonth}-${indicator.PeriodToYear}`,
                  OID: indicator.OID
                });
              });
            });
        });
    }

    openIndicator(event, data) {
      event.stopPropagation();
      data.component.collapseAll(-1);
      data.component.expandRow(data.key);
      this.isAddedColumns = false;
      this.getIndicatorsForCurrentPrincipleGroup(data.key.OID);
    }

    showFormPopup() {
      this.yearArrayTo = []
      this.yearArrayFrom = []
      this.generateYearsArray();
      this.getMaxPeriodByUnit(this.userService.currentUser['CurrentUnitId'])
    }

    onFormSubmitCreateDataSet(type, e?) {
      if(type===null) {
        delete this.newDataSet.OID
        this.newDataSet = {...this.standardsService.getNewDataSet()};
      }
      this.newDataSet.Unit = this.userService.currentUser['CurrentUnitId'];
      this.newDataSet.PeriodFromMonth = this.periodFromMonth;
      this.newDataSet.PeriodFromYear = this.periodFromYear.text;
      this.newDataSet.PeriodToMonth = this.periodToMonth;
      this.newDataSet.PeriodToYear = this.periodToYear.text;
      this.indicatorDataSetValueService.addNewIndicatorDataSet(this.newDataSet)
        .subscribe(dataset => {
            let types = type ? type : 'CREATED';
            this.userService.showUserNotification(`DATA SET WAS ${types}`, 'success');
            this.createDataSetForm.instance.resetValues();
            this.isCreateDataSetPopupVisible = false;
            this.dataSetOidArray = [];
            this.indicatorDataSetList = [];
            this.testArray1 = [];
            this.principleGroupsForTableList = [];
            this.isShowConfirmationEditPopup = false;
            this.isEditDataSetPopupVisible = false;
            this.loadingVisible = false;
            this.indicatorDataSetList = []
            this.loadData();
          },
          error => {
            this.userService.showUserNotification(error.error.Message, 'error');
          });
      if(e){
        e.preventDefault();
      }
    }

    showChangesFromYear(e) {
     this.periodFromYear = {...this.periodFromYearSelector.selectedItem};
      if (this.periodFromYearSelector.selectedItem.text === this.yearArrayFrom[this.yearArrayFrom.length - 1].text) {
        for (let i = this.yearArrayFrom.length - 2; i> 0; i--){
          if(!this.yearArrayFrom[i].disabled){
            this.periodFromYearSelector.value = this.yearArrayFrom[i].text;
            this.periodToYearSelector.value = this.yearArrayFrom[i + 1].text;
            break;
          }
        }
      }
      if (this.periodToMonth !== '12') {
        this.periodToYearSelector.value = this.periodFromYearSelector.selectedItem.text + 1;
        this.periodToYear = this.yearArrayTo.find(el => el.text === this.periodFromYearSelector.selectedItem.text + 1);
      } else {
        this.periodToYearSelector.value = this.periodFromYearSelector.selectedItem.text;
        this.periodToYear = this.yearArrayTo.find(el => el.text === this.periodFromYearSelector.selectedItem.text);
      }
      this.yearArrayTo.forEach( el => {
        if(+el.text < +this.periodFromYearSelector.value) {
          el.disabled = true;
        } else {
          el.disabled = false
        }
      })
    }

    generateYearsArray() {
      let date = new Date();
      let year = date.getFullYear();

      for (let i = 2000; i <= year; i++) {
        this.yearArrayFrom.push({text: i, disabled: false});
        this.yearArrayTo.push({text: i, disabled: false});
      }
      this.yearArrayFrom.forEach(el => {
        if (this.indicatorDataSetList.find(e => e.PeriodFromYear === el.text)) {
          el.disabled = true
        }
      });
    }

    getMaxPeriodByUnit(currentUnitId) {
      this.periodFromYear = {};
      this.periodToYear = {};
      this.periodFromYear = this.yearArrayFrom.find(el => !el.disabled)
      //this.periodToYear = this.yearArrayTo.find(el => el.text === this.periodFromYear.text + 1)
      this.periodToYear = {...this.periodFromYear}
      this.isCreateDataSetPopupVisible = true;
    }

    editDataset(dataset, template){
      this.yearArrayTo = [];
      this.yearArrayFrom = [];
      this.newDataSet.OID = dataset.OID;
      this.periodFromYear = {text: +dataset.PeriodFrom.split('/')[0].split('-')[1], disabled: false};
      this.periodToYear = {text: +dataset.PeriodFrom.split('/')[1].split('-')[1], disabled: false};
      this.periodFromMonth = dataset.PeriodFrom.split('/')[0].split('-')[0];
      this.periodToMonth = dataset.PeriodFrom.split('/')[1].split('-')[0];
      this.generateYearsArray();
      this.currentPopupConfig = this.indicatorDataSetValueService.editDataSet
      this.currentPopupTemplate = template;
      this.popupShow = true;
    }

    setMonthPeriod(event) {
      if (event && event.value) {
        this.periodFromMonth = '' + event.value;
        this.periodToMonth = this.monthArray[this.monthArray.indexOf(this.periodFromMonth) - 1]
          ? this.monthArray[this.monthArray.indexOf(this.periodFromMonth) - 1] : this.monthArray[11];
        if (this.periodToMonth === this.monthArray[11] && this.periodToYear.text !== this.periodFromYear.text) {
          this.periodToYear = this.yearArrayTo[this.yearArrayTo.indexOf(this.periodFromYear)];
        }
        if (this.periodToMonth !== this.monthArray[11] && this.periodToYear.text === this.periodFromYear.text) {
          this.periodToYear = this.yearArrayTo[this.yearArrayTo.indexOf(this.periodFromYear) + 1];
        }
      }
    }

    deleteNote(note, itemData, template) {
      this.currentNote = note;
      this.currentItemData = itemData;
      this.currentPopupConfig = this.indicatorDataSetValueService.confirmPopup;
      this.currentPopupTemplate = template;
      this.popupShow = true;
    }

    cancelDeleteNote() {
      this.popupShow = false;
      this.currentPopupTemplate = '';
    }

    confirmDeleteNote() {
      if (this.currentNote && this.currentNote.OID) {
        this.indicatorDataSetValueService.deletePrimaryDataFieldNote(this.currentNote.OID).subscribe(response => {
        });
        this.testArray1.forEach(indicator => {
          if (indicator.PrimaryDataFieldOid === this.currentItemData.IndicatorOid) {
            indicator.IndicatorNotesCount--;
          }
        });
        let index = this.currentItemData.Notes.indexOf(this.currentNote);
        if (index > -1) {
          this.currentItemData.Notes.splice(index, 1);
        }
      }
      this.updateNoteOid = -1;
      this.popupShow = false;
      this.currentPopupTemplate = '';
    }

    updateNote(note, itemData) {
      let paramForAddNote =
        {
          PrimaryDataField: itemData.IndicatorOid,
          DataSet: itemData.IndicatorDataSetOid,
          Note: note.Message,
          OID: note.OID
        };
      this.standardsService.addIndicatorsNotes(paramForAddNote)
        .subscribe((response) => {
          this.testArray1.forEach(indicator => {
            if (indicator.PrimaryDataFieldOid === itemData.IndicatorOid) {
              indicator.IndicatorNotesCount++;
            }
          });
          let existingNoteIndex = itemData.Notes.findIndex(note => {
            return note.OID === response.body;
          });
          if (existingNoteIndex != -1) {
            itemData.Notes[existingNoteIndex] = {
              OID: response.body,
              Message: note.Message,
              Created: new Date(),
              UserFullName: this.getUserName()
            };
          }
          this.updateNoteOid = -1;
        });
    }

    noteValueChanged(event) {
      if (event.target.value === "") {
        this.updateNoteOid = -1;
      }
    }

    changeNote(event, key) {
      key.Message = event.value;
    }

    customizeChartTooltip = (args: any) => {
      return {html: '<span>' + args.value.toLocaleString('en').toString() + '</span>'};
    }

    updateDataSet() {
      this.onFormSubmitCreateDataSet('UPDATED', null);
    }

    getMapAreaMode(event, selector) {
      this.indicatorDataSetValueService.createOrUpdateDataFieldUserEditMode({
        PrimaryDataField: selector.data.PrimaryDataFieldOid, AreaSizeMode: event.value ? 1 : 0
      }).subscribe(data => {
        this.selectCurrentRow();
      });
    }

   isDisabledMapArea(value) {
      if (value.data.IsMapArea) {
        return !value.data.IsMapManual;
      }
    }

    isDisabledMonthly(value) {
      if (value.data.IsMonthlyDataModeAvailable) {
        return value.data.IsMonthlyDataMode
      }
    }

    getMonthlyPopup(value, template){

      if(!value.data.IsMonthlyDataMode) return;

      let dataValue = [value.data.PrimaryDataValue[value.columnIndex-2].ValueOid]
   /*   value.data.PrimaryDataValue.forEach(value => {
        dataValue.push(value.ValueOid)
      });*/
      console.log(dataValue)
      this.indicatorDataSetValueService.getPrimaryDataMonthValuesByCommodity(dataValue, value.data.CommodityOid)
        .subscribe((data: any)=> {
          console.log(data)
          this.monthlyData = data;

          this.monthlyData.MonthValues.push({
            Values: [],
            MonthNumber: 'Total'
          });

          this.currentPopupConfig = this.indicatorDataSetValueService.monthModePopup;
          this.currentPopupConfig.title = `${data.Name} (${data.CommodityReference}) - ${data.DefaultUOM} `;
          this.monthlyPopupTitle = `${data.Name} (${data.CommodityReference}) - ${data.DefaultUOM} `
          this.currentPopupTemplate = template;
          this.popupShow = true;
        });
    }

    onPopupHidden() {
      this.currentPopupTemplate = '';
      this.monthlyPopupTitle = ''

    }

    closePopup() {

      this.popupShow = false
    }

    updateMonthlyValue(event, data) {
      if (data.data.MonthNumber==='Total') return;
      const payload: MonthlyValuesPayload  = {
        PrimaryDataValue: this.monthlyData.Periods[data.columnIndex-1].ValueOid,
        MonthNumber: data.data.MonthNumber,
        Value: event.value
      }
      //MonthlyValuesPayload
      console.log(event)
      console.log(data)

      this.indicatorDataSetValueService.createOrUpdatePrimaryDataMonthValues(payload)
        .subscribe(el => {
          console.log(el)
          data.data.Values[data.columnIndex-1] = event.value
        })
    }

    getDataMode(event, selector) {
      this.indicatorDataSetValueService.createOrUpdateDataFieldUserEditMode({
        PrimaryDataField: selector.data.PrimaryDataFieldOid,
        PeriodDataMode : event.value ? 1 : 0,
        Commodity: selector.data.CommodityOid
      }).subscribe(data => {
        console.log(data)
        selector.data.IsMonthlyDataMode = event.value;
      })
    }

    getValue(el) {

      if(el.data.MonthNumber === 'Total') {
        let total = 0;
        this.monthlyData.MonthValues.forEach(item => {
          total = total + (item.Values[el.columnIndex-1] ? +item.Values[el.columnIndex-1] : 0)
        });
        return total;
      }
      return el.data.Values[el.columnIndex-1]
    }

    setUpDataSets(event, item, index, el) {
      if (!item) return;
      item.IsChecked = event;
      this.checkedDataSets = this.indicatorDataSetList.filter(item => item.IsChecked);
      if (event && this.checkedDataSets.length > 5) {
        this.userService.showUserNotification('You Can Choose 5 Data Sets', 'error');
        this.checkedDataSets = this.checkedDataSets.filter(el => el.OID !== item.OID);
        item.IsChecked = false;
        el.target.checked = false;
        return
      }
      this.selectdataset = false;
      this.dataTable.instance.columnOption(index + 2, 'visible', event);
      this.selectCurrentRow();
    }

    getMonthByNumber(number) {
      return this.indicatorDataSetValueService.getMonthByNumber(number);
    }
}
