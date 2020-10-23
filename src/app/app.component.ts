import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  listTerritories = [
    { name: 'Território 1',
      listPdvs: [
        { name: 'PDV 1', sequence: 1, latlng: [-46.9524902, -23.4464079]},
        { name: 'PDV 2', sequence: 2, latlng: [-47.2079783, -22.8920565]},
        { name: 'PDV 3', sequence: 3, latlng: [-46.3659506, -23.5400152]}
      ],
      color: '#db356c'},

    { name: 'Território 2',
      listPdvs: [
        { name: 'PDV 4', sequence: 1, latlng: [-46.9424800, -23.4363000]},
        { name: 'PDV 5', sequence: 2, latlng: [-47.2179783, -22.8930565]},
        { name: 'PDV 6', sequence: 3, latlng: [-46.3759506, -23.5410152]}
      ],
      color: '#777' },

      { name: 'Território 3',
      listPdvs: [
        { name: 'PDV 4', sequence: 1, latlng: [-46.9424800, -23.4363000]},
        { name: 'PDV 5', sequence: 2, latlng: [-47.2179783, -22.8930565]},
        { name: 'PDV 6', sequence: 3, latlng: [-46.3759506, -23.5410152]}
      ],
      color: '#777' },

      { name: 'Território 4',
      listPdvs: [
        { name: 'PDV 4', sequence: 1, latlng: [-46.9424800, -23.4363000]},
        { name: 'PDV 5', sequence: 2, latlng: [-47.2179783, -22.8930565]},
        { name: 'PDV 6', sequence: 3, latlng: [-46.3759506, -23.5410152]}
      ],
      color: '#777' },

      { name: 'Território 5',
      listPdvs: [
        { name: 'PDV 4', sequence: 1, latlng: [-46.9424800, -23.4363000]},
        { name: 'PDV 5', sequence: 2, latlng: [-47.2179783, -22.8930565]},
        { name: 'PDV 6', sequence: 3, latlng: [-46.3759506, -23.5410152]}
      ],
      color: '#777' },

      { name: 'Território 6',
      listPdvs: [
        { name: 'PDV 4', sequence: 1, latlng: [-46.9424800, -23.4363000]},
        { name: 'PDV 5', sequence: 2, latlng: [-47.2179783, -22.8930565]},
        { name: 'PDV 6', sequence: 3, latlng: [-46.3759506, -23.5410152]}
      ],
      color: '#777' },

      { name: 'Território 7',
      listPdvs: [
        { name: 'PDV 4', sequence: 1, latlng: [-46.9424800, -23.4363000]},
        { name: 'PDV 5', sequence: 2, latlng: [-47.2179783, -22.8930565]},
        { name: 'PDV 6', sequence: 3, latlng: [-46.3759506, -23.5410152]}
      ],
      color: '#777' }
  ];

  ngOnInit(): void {
    const map = tt.map({
      key: 'b6A6onVAGnbiAQks4OvxxrGqaI6f8cpm',
      container: 'map',
      center: [-46.9835547, -23.3225887],
      zoom: 8
    });

    map.on('load', () => {
      map.addControl(new tt.NavigationControl());
      this.drawTerritories(map, this.listTerritories);
    });
  }

  drawTerritories(map, listTerritories): void {
    listTerritories.forEach(territory => {
      console.log(territory);
      this.drawPdvMarkers(map, territory.listPdvs);
      this.addTerritoriesLayer(map, territory);
    });
  }

  drawPdvMarkers(map, listPdvs): void {
    listPdvs.forEach(pdv => {
      new tt.Marker()
        .setLngLat(pdv.latlng)
        .setDraggable(true)
        .addTo(map);
    });
  }

  addTerritoriesLayer(map, territory): void {
    map.addLayer({
      id: territory.name,
      type: 'fill',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [territory.listPdvs.map(pdv => pdv.latlng)]
          }
        }
      },
      layout: {},
      paint: {
          'fill-color': territory.color,
          'fill-opacity': 0.5,
          'fill-outline-color': 'black'
      }
    });
  }
}
