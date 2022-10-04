import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { AreaMappingService, MapDataFieldsCategory, PrimaryDataField, ProductionArea } from './area-mapping.service';
import DrawingManager = google.maps.drawing.DrawingManager;
import { DxDataGridComponent, DxSelectBoxComponent } from 'devextreme-angular';
import Polygon = google.maps.Polygon;
import MapTypeId = google.maps.MapTypeId;
import { UnitService } from '../../../shared/services/unit.service';
import { UnitInfo } from '../../../shared/models/unit.model';
import { forkJoin } from "rxjs/index";
import * as cloneDeep from 'lodash/cloneDeep';


@Component({
  selector: 'area-mapping',
  templateUrl: './area-mapping.component.html',
  styleUrls: ['./area-mapping.component.scss']
})
export class AreaMappingComponent implements OnInit {

  @ViewChild('dataTable') dataTable: DxDataGridComponent;
  @ViewChild('gmap') gmap: ElementRef;

  @ViewChild('periodFromMonthSelector')
  public periodFromMonthSelector: DxSelectBoxComponent;

  public indicatorDataSetList: any[] = [];
  public googleMap: google.maps.Map;
  public drawingManager: DrawingManager;
  public currentDataSet: any;

  public response: any;
  public mapClass = 'area-maping-map-inactive';
  public isMapActive = false;
  public polygon: any;
  public isAddNamePopup = false;
  public isEditPopup = false;
  public currentProductionArea: ProductionArea;
  public oldProductionArea: ProductionArea;
  public isShowConfirmationPopup = false;
  public productionAreaForDelete: ProductionArea;
  public isPolygonChoosen = false;
  public polygons: any = [];
  public oldPolygons: any = [];
  public currentPrimaryDataField;
  public defaultLat: number;
  public defaultLng: number;

  public isGuidancePopoverVisible: number;
  public loadingVisible = false;
  public periodToValue;
  public currentCategory: any;
  public isShowCopyValuesPopup = false;
  public categories: MapDataFieldsCategory[] = [];
  public isSelected: any;
  public unitName: string;
  public isMultyEditMode = false;
  public polygonsForMultySave = [];
  public polygonsForEdit = [];
  isNewPolygon = false;
  selectedProdFieldsOid = [];
  constructor(private userService: UserService,
              private unitService: UnitService,
              private areaMappingService: AreaMappingService) {
  }

  ngOnInit() {
    this.loadingVisible = true;
    let unitInfo = new UnitInfo();
    this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
      .subscribe((unit: UnitInfo) => {
          unitInfo = unit;
          this.unitName = unitInfo.UnitName;
        },
        (error1 => console.log(error1)),
        () => {
          this.defaultLng = unitInfo.LocationLongtitude;
          this.defaultLat = unitInfo.LocationLattitude;
          this.initMap();
          this.gmap.nativeElement.css = 'opacity: 0.5;pointer-events: none;';
          this.clearAllPoligons();
          this.clearAllPoligons();
        });

    this.areaMappingService.getIndicatorsDatasetForCurrentUser()
      .subscribe((indicatorDataSetList: any) => {
          indicatorDataSetList.map(indicator => {
            this.indicatorDataSetList.push({
              PeriodFrom: `${indicator.PeriodFromMonth < 10 ? '0' + indicator.PeriodFromMonth
                : indicator.PeriodFromMonth}-${indicator.PeriodFromYear}/${indicator.PeriodToMonth < 10
                ? '0' + indicator.PeriodToMonth : indicator.PeriodToMonth}-${indicator.PeriodToYear}`,
              OID: indicator.OID,
              Progress: indicator.Progress
            });
          });
        }, error1 => {
          console.log(error1);
          this.loadingVisible = false;
        },
        () => {
          this.areaMappingService.getMapDataFieldsCategories()
            .subscribe((response: MapDataFieldsCategory[]) => {
                this.categories = response;
                this.currentCategory = this.categories[0];
              }, error1 => {
                console.log(error1);
                this.loadingVisible = false;
              },
              () => {
                this.getDatafieldsForAllCategories();
              });
        });
  }

  setCurrentDataSet($event) {
    this.loadingVisible = true;
    this.isSelected = false;
    this.clearAllPoligons();
    this.currentDataSet = $event.selectedItem;
    this.isMultyEditMode = false;
    this.polygonsForMultySave = [];
    this.polygonsForEdit = [];
    this.isNewPolygon = false;
    this.polygons = [];
    this.polygonsForEdit = [];
    if (this.polygon && this.polygon.polygon)
      this.polygon.polygon.setMap(null);
    this.polygon = null;
    this.categories.forEach(category => {
      category.PrimaryDataFields = []
    });
    this.getDatafieldsForAllCategories();
  }

  showAllAreas() {
    this.isSelected = null;
    this.categories.forEach(category => {
      if(category.PrimaryDataFields) {
        category.PrimaryDataFields.forEach(area => {
          this.showSelectedAreas(area, category.OID)
        })
      }
    });
    this.fitBoundsHandler()
  }

  addArea(primaryDataField, categoryOid) {
    this.oldProductionArea = null;
    this.mapClass = 'area-maping-map-inactive';
    this.isMapActive = false;
    this.drawingManager.setMap(null);
    this.currentProductionArea = new ProductionArea();
    this.currentPrimaryDataField = primaryDataField;
    this.currentProductionArea.PrimaryDataFieldOid = primaryDataField.PrimaryDataFieldOid;
    this.currentProductionArea.DataSetOid = this.currentDataSet.OID;
    this.polygon = {dataFieldOid: primaryDataField.PrimaryDataFieldOid, categoryOid: categoryOid, productionArea: this.currentProductionArea};

    if(this.polygons.length) {
      this.polygons.forEach(polygon => {
        polygon.polygon.setOptions({
          draggable: false,
          editable: false
        })
      })
    }

    this.isAddNamePopup = true;
  }

  addAreaName(event) {
    this.isNewPolygon = true;
    this.isAddNamePopup = false;
    this.isEditPopup = false;
    this.currentProductionArea.DrawingData = '';
    this.toggleMap();
  }

  initMap() {
    if (!this.defaultLng || !this.defaultLat) {
      this.defaultLng = 0.0;
      this.defaultLat = 53.0;
    }
    this.googleMap = new google.maps.Map(document.getElementById('googleMap'), {
      mapTypeId: MapTypeId.HYBRID,
      center: {
        lat: this.defaultLat,
        lng: this.defaultLng,
      },
      zoom: 13
    });

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      }
    });

    google.maps.event.addListener(this.drawingManager, 'polygoncomplete', this.setCoordinates.bind(this));
  }

  toggleMap() {
    if (this.mapClass === 'area-maping-map-inactive') {
      this.mapClass = 'area-maping-map-active';
      this.isMapActive = true;
      this.drawingManager.setMap(this.googleMap);
    } else {
      this.mapClass = 'area-maping-map-inactive';
      this.isMapActive = false;
      this.drawingManager.setMap(null);
    }
  }

  setCoordinates = (polygon) => {
    if (this.polygon && !this.polygon.polygon) {
      this.polygon.polygon = polygon
    }
    let vertices = polygon.getPath();
    this.polygon.productionArea.DrawingData = '';
    this.polygon.productionArea.DrawingData += '[';
    for (let i = 0; i < vertices.getLength(); i++) {
      let xy = vertices.getAt(i);
      this.polygon.productionArea.DrawingData += `{"lat": ${xy.lat()}, "lng": ${xy.lng()}}`;
      if (i !== vertices.getLength() - 1) {
        this.polygon.productionArea.DrawingData += ',';
      }
    }
    this.polygon.productionArea.DrawingData += ']';
    this.polygon.productionArea.Size = google.maps.geometry.spherical.computeArea(polygon.getPath());
    this.isPolygonChoosen = true;

    if (this.isMultyEditMode) {
      let updatedPolygonIndex: number;
      updatedPolygonIndex = this.polygonsForMultySave.findIndex(el => el.areaOid === this.polygon.areaOid)
      if (updatedPolygonIndex !== -1) {
        this.polygonsForMultySave[updatedPolygonIndex] = this.polygon
      } else {
        this.polygonsForMultySave.push(this.polygon)
      }

    }
  }

  multySaveHeandler() {
    let requestsToSave = [];
    this.polygon = null;
    this.polygonsForMultySave.forEach(el => {
      requestsToSave.push(this.areaMappingService.saveProductionArea(el.productionArea))
    });

    forkJoin(requestsToSave)
      .subscribe(response => {
         this.polygonsForEdit.forEach(polygon => {
          polygon.polygon.setOptions({
            draggable: false,
            editable: false
          })
        });

        this.isMultyEditMode = false;
        this.toggleMap();
      })
  }

  saveProductionArea() {
    if (this.isMultyEditMode && !this.isNewPolygon) {
      this.multySaveHeandler();
      return
    }

    this.areaMappingService.saveProductionArea(this.polygon.productionArea).subscribe(response => {
        this.response = response;
      },
      error1 => {
        console.log(error1);
        this.cancelAddProductionArea()
      },
      () => {
        if (!this.currentProductionArea.OID) {  // cteating a new area and adding to areas list

          this.currentProductionArea.OID = this.response.OID;
          this.categories.forEach(category => {
            const index = category.PrimaryDataFields.findIndex(areaInfo => areaInfo.PrimaryDataFieldOid === this.currentProductionArea.PrimaryDataFieldOid);
            if (index >= 0) {
              category.PrimaryDataFields[index].ProductionAreas.push(this.currentProductionArea)
              this.polygon.areaOid = this.response.OID;
              this.polygon.productionArea = this.response;
            }
          });
          this.polygon.polygon.setOptions({
            strokeColor: this.getHexColor(this.currentPrimaryDataField.Color),
            fillColor: this.getHexColor(this.currentPrimaryDataField.Color),
            draggable: false,
            editable: false
          });
          if (this.isMultyEditMode) {
            this.polygons.push(this.polygon);
            this.polygon = null
          }
          this.isNewPolygon = false;
        } else {
          this.currentProductionArea = this.response;
          this.polygon.polygon.setOptions({
            draggable: false,
            editable: false
          });
        }
        if (this.isMapActive) {
          this.toggleMap();
          this.isSelected = this.currentProductionArea.OID;
        }
      });
  }

  deleteProductionArea(productionArea: ProductionArea) {
    if (!this.isMapActive) {
      this.productionAreaForDelete = productionArea;
      this.isShowConfirmationPopup = true;
    }
  }

  confirmDeleteProductionArea() {
    this.areaMappingService.deleteProductionArea(this.productionAreaForDelete.OID).subscribe(response => {
        this.response = response;
      },
      error1 => {
        this.isShowConfirmationPopup = false;
      },
      () => {
        this.categories.forEach(category => {
          category.PrimaryDataFields.forEach(primaryDataField => {
            let index = primaryDataField.ProductionAreas.findIndex(areaInfo => areaInfo.OID === this.productionAreaForDelete.OID);
            if (index >= 0) {
              category.PrimaryDataFields[category.PrimaryDataFields.findIndex(pr => pr.PrimaryDataFieldOid === primaryDataField.PrimaryDataFieldOid)].ProductionAreas.splice(index, 1);
              this.isPolygonChoosen = false;
              this.polygon.polygon.setMap(null);
              this.polygon = null;
            }
          });
        });
        this.isShowConfirmationPopup = false;
      });
  }

  cancelDelete() {
    this.isShowConfirmationPopup = false;
  }

  cancelAddProductionArea() {
    this.currentProductionArea = {
      ...this.oldProductionArea
    };

    if (this.polygonsForEdit.length) {
      this.polygonsForEdit.forEach((polygon, index) => {
        const undoCoords = JSON.parse(this.oldPolygons[index].productionArea.DrawingData);
        polygon.polygon.setOptions({
          paths: undoCoords,
          draggable: false,
          editable: false
        });
      });

    }
    if (this.oldProductionArea && this.oldProductionArea.DrawingData) {
      const undoCoodinates = JSON.parse(this.oldProductionArea.DrawingData);
      this.polygon.polygon.setOptions({
        paths: undoCoodinates,
        draggable: false,
        editable: false
      });
    } else {
      if(this.polygon && this.polygon.polygon && this.isNewPolygon){
        this.polygon.polygon.setMap(null);
        this.isNewPolygon = false;
      }
    }
    this.toggleMap();
    this.isPolygonChoosen = false;
    this.isMultyEditMode = false
  }

  editAllAreas(category) {
    if (this.currentProductionArea && this.currentProductionArea.Name) this.currentProductionArea.Name = '';

    if (category.PrimaryDataFields.some(dataField => dataField.ProductionAreas.length > 0)) {
      if (this.isMultyEditMode) {
        this.oldPolygons = [];
        if (this.polygonsForEdit.length) {
          this.polygonsForEdit.forEach(polygon => {
            polygon.polygon.setOptions({
              draggable: false,
              editable: false
            });
          });
          this.polygonsForEdit = [];
        }
      }

      this.isMultyEditMode = true;
      this.mapClass = 'area-maping-map-active';
      this.isMapActive = true;
      this.drawingManager.setDrawingMode(null);
      this.drawingManager.setMap(this.googleMap);

      if (this.polygons.length) {
        this.polygonsForEdit = this.polygons.filter(el => el.categoryOid === category.OID)
      }
      if(this.polygon && this.polygon.categoryOid === category.OID) {
        this.polygonsForEdit.push(this.polygon)
        //this.polygon.polygon.setMap(null)
      } else {
        // this.polygon.polygon.setMap(this.googleMap)
      }

      this.oldPolygons = cloneDeep(this.polygonsForEdit);
      this.polygonsForEdit.forEach(polygon => {
        polygon.polygon.setOptions({
          draggable: true,
          editable: true
        });

        google.maps.event.addListener(polygon, 'dragend', this.editAllPolygons.bind(polygon, polygon));
        google.maps.event.addListener(polygon.polygon.getPath(), 'insert_at', this.editAllPolygons.bind(polygon, polygon));
        google.maps.event.addListener(polygon.polygon.getPath(), 'remove_at', this.editAllPolygons.bind(polygon, polygon));
        google.maps.event.addListener(polygon.polygon.getPath(), 'set_at', this.editAllPolygons.bind(polygon, polygon));
      })
    }

  }

  showSelectedAreas(primaryDataField: PrimaryDataField, categoryOid) {

    if (primaryDataField.isShownAreas) {
      return;
    }

    this.currentPrimaryDataField = primaryDataField;
    primaryDataField.isShownAreas = true;
    this.isPolygonChoosen = false;
    this.isMapActive = false;
    this.mapClass = 'area-maping-map-inactive';

    if(primaryDataField.ProductionAreas && primaryDataField.ProductionAreas.length) {
      primaryDataField.ProductionAreas.forEach(prodArea => {         
        if (!this.polygon || this.polygon && this.polygon.areaOid !== prodArea.OID) {          
          if(prodArea.DrawingData != ""){          
          let coodinates = JSON.parse(prodArea.DrawingData);
          let pol = new Polygon({
            paths: coodinates,
            strokeColor: this.getHexColor(primaryDataField.Color),
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: this.getHexColor(primaryDataField.Color),
            fillOpacity: 0.35
          });
          this.polygons.push({
            categoryOid: categoryOid,
            dataFieldOid: primaryDataField.PrimaryDataFieldOid,
            areaOid: prodArea.OID,
            polygon: pol,
            color: primaryDataField.Color,
            productionArea: prodArea
          });
          pol.setMap(this.googleMap);
        }
      }
      });
    }
    this.fitBoundsHandler();
  }

  fitBoundsHandler() {
    const bounds = new google.maps.LatLngBounds();
    if (this.polygons && this.polygons.length) {
      this.polygons.forEach(polygon => {
        for (let i = 0; i < polygon.polygon.getPath().length; i++) {
          const point = new google.maps.LatLng(polygon.polygon.getPath().getAt(i).lat(), polygon.polygon.getPath().getAt(i).lng());
          bounds.extend(point);
        }
      });
      this.googleMap.fitBounds(bounds);
    }
  }

  hideSelectedAreas(primaryDataField: PrimaryDataField) {
    primaryDataField.isShownAreas = false;
    this.clearCurrentPoligon(primaryDataField.PrimaryDataFieldOid);
    const bounds = new google.maps.LatLngBounds();
    if (!this.polygons.length && !this.isSelected) {
      this.initMap();
    } else if (this.polygons.length && !this.isSelected) {
      const bounds = new google.maps.LatLngBounds();
      this.polygons.forEach(polygon => {
        for (let i = 0; i < polygon.polygon.getPath().length; i++) {
          const point = new google.maps.LatLng(polygon.polygon.getPath().getAt(i).lat(), polygon.polygon.getPath().getAt(i).lng());
          bounds.extend(point);
        }
      });
      this.googleMap.fitBounds(bounds);
    } else if (!this.polygons.length && this.isSelected) {
      for (let i = 0; i < this.polygon.polygon.getPath().length; i++) {
        const point = new google.maps.LatLng(this.polygon.polygon.getPath().getAt(i).lat(), this.polygon.polygon.getPath().getAt(i).lng());
        bounds.extend(point);
      }
      this.googleMap.fitBounds(bounds);
    }
  }

  showSelectedProductionArea(productionArea: ProductionArea, primaryDataField) {
   if (this.isMultyEditMode) {
      return
    }
    if(this.polygon && this.polygon.polygon) {
      if (this.selectedProdFieldsOid.find(el => el === this.polygon.dataFieldOid)) {
        this.polygons.push(this.polygon)
      } else {
       // this.polygon.polygon.setMap(null)
      }
    }
    let isPolygonSelected = false;
    this.drawingManager.setMap(null);
    this.isSelected = productionArea.OID;
    this.currentPrimaryDataField = primaryDataField;
    this.currentProductionArea = productionArea;
    this.polygons.forEach((polygon) => {
      if (polygon.areaOid === this.isSelected) {
        this.polygon = polygon;
        isPolygonSelected = true;
      }
    });
    if(this.polygon) {
      if (this.selectedProdFieldsOid.find(el => el === this.polygon.dataFieldOid)) {
        this.polygons = this.polygons.filter(polygon => polygon.areaOid !== this.polygon.areaOid);
      }
    }

    this.isPolygonChoosen = false;
    this.mapClass = 'area-maping-map-inactive';
    let coodinates = JSON.parse(productionArea.DrawingData);
    if (!isPolygonSelected || !this.polygon) {
      let pol = new Polygon({
        paths: coodinates,
        strokeColor: this.getHexColor(this.currentPrimaryDataField.Color),
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: this.getHexColor(this.currentPrimaryDataField.Color),
        fillOpacity: 0.35
      });

      this.polygon = {dataFieldOid: primaryDataField.PrimaryDataFieldOid, areaOid: productionArea.OID, polygon: pol};
      this.polygon.polygon.setMap(this.googleMap);
    }

    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < coodinates.length; i++) {
      const point = new google.maps.LatLng(coodinates[i].lat, coodinates[i].lng);
      bounds.extend(point);
    }
    this.googleMap.fitBounds(bounds);
  }

  editPoligon(productionArea: ProductionArea, color) {

    this.isMultyEditMode = false;
    this.mapClass = 'area-maping-map-active';
    this.isMapActive = true;
    this.drawingManager.setMap(this.googleMap);
    this.currentProductionArea = {...productionArea};
    this.oldProductionArea = {
      ...this.currentProductionArea
    };
    this.drawingManager.setDrawingMode(null);
    const coordinates = JSON.parse(this.currentProductionArea.DrawingData);
    this.polygon.productionArea = productionArea;
    this.polygon.color = color;
    this.polygon.polygon.setOptions({
      paths: coordinates,
      strokeColor: this.getHexColor(color),
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: this.getHexColor(color),
      fillOpacity: 0.35,
      draggable: true,
      editable: true
    });
    this.polygon.polygon.setMap(this.googleMap);

    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < coordinates.length; i++) {
      const point = new google.maps.LatLng(coordinates[i].lat, coordinates[i].lng);
      bounds.extend(point);
    }

    this.googleMap.fitBounds(bounds);

    google.maps.event.addListener(this.polygon, 'dragend', this.setEditedCoordinates.bind(this));
    google.maps.event.addListener(this.polygon.polygon.getPath(), 'insert_at', this.setEditedCoordinates.bind(this));
    google.maps.event.addListener(this.polygon.polygon.getPath(), 'remove_at', this.setEditedCoordinates.bind(this));
    google.maps.event.addListener(this.polygon.polygon.getPath(), 'set_at', this.setEditedCoordinates.bind(this));
  }

  editAllPolygons = (pol, polygon) => {
    this.polygon = pol;
    this.setCoordinates(this.polygon.polygon);
  }

  setEditedCoordinates() {
    this.setCoordinates(this.polygon.polygon);
  }

  clearAllPoligons() {
    this.polygons.forEach(item => {
      item.polygon.setMap(null);
    });
  }

  clearCurrentPoligon(area) {

    this.polygons.forEach(item => {
      if (item.dataFieldOid === area && !this.polygon || item.dataFieldOid === area && this.polygon.areaOid !== item.areaOid) {
          item.polygon.setMap(null);
        }
    });

    this.selectedProdFieldsOid = this.selectedProdFieldsOid.filter(oid => oid !==area)
    this.polygons = this.polygons.filter(pol => pol.dataFieldOid !== area);
  }


  getHexColor(number) {
    return "#" + ((number) >>> 0).toString(16).slice(-6);
  }


  getDatafieldsForAllCategories(){
    this.loadingVisible = true;
    let respArr = [];
    this.categories.forEach(category => {
      respArr.push(this.areaMappingService.getCategoryMapPrimaryDataFields(this.currentDataSet.OID, category.OID))
    });
    forkJoin(respArr).subscribe(dataFields => {
      this.categories.forEach((category, index) => {
        category.PrimaryDataFields = dataFields[index]
        category.PrimaryDataFields.forEach(el => {
          if(el.ProductionAreas.length)
          this.selectedProdFieldsOid.push(el.PrimaryDataFieldOid)
          }
        )

      });
      this.showAllAreas();
      this.loadingVisible = false;
    })
  }

  getPrimaryDataFieldsByCategoryOid(category) {
    this.drawingManager.setMap(null);
    this.loadingVisible = true;
    this.currentCategory = category;
    this.areaMappingService.getCategoryMapPrimaryDataFields(this.currentDataSet.OID, category.OID).subscribe((resp: any[]) => {
      this.categories.forEach(cat => {
        if (cat.OID !== category.OID) {
          // cat.PrimaryDataFields = [];
        } else {
          category.PrimaryDataFields = resp;
        }
      });
      this.showAllAreas();
      this.loadingVisible = false;
    });
  }

  getGuidance(areaInfo) {
    if (areaInfo) {
      this.isGuidancePopoverVisible = areaInfo.PrimaryDataFieldOid;
    } else {
      this.isGuidancePopoverVisible = -1;
    }
  }

  setPeriodTo(event) {
    if (event.selectedItem) {
      this.areaMappingService.isDataSetHaveMapData(event.selectedItem.OID)
        .subscribe(isHaveData => {
          if (isHaveData) {
            this.isShowConfirmationPopup = true;
          }
          this.periodToValue = event.selectedItem.OID;
        });
    }
  }

  addDatasetToCopyValues() {
    this.isShowCopyValuesPopup = true;
  }

  cancelCoping() {
    this.isShowConfirmationPopup = false;
    this.isShowCopyValuesPopup = false;
    this.periodToValue = null;
  }

  confirmCoping() {
    this.areaMappingService.сopyMapDataValues(this.currentDataSet.OID, this.periodToValue)
      .subscribe(data => {
        this.isShowCopyValuesPopup = false;
        this.isShowConfirmationPopup = false;
        this.periodToValue = null;
      });
  }
}
