import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as L from 'leaflet'
 
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
    standalone: false,
 
})
export class MapPage implements OnInit {
private mapa:L.Map| undefined
private marcadores: L.Marker[]=[]
private icono= L.icon({
  iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25,41],
  iconAnchor:[12,41],
  popupAnchor:[1,-34],
  shadowSize:[41,41]
})
  constructor(public plataforma:Platform) { }
 
  ngOnInit() {
    this.plataforma.ready().then(()=>{
      this.inicializacion()
    })
  }
  private inicializacion()
  {
    this.mapa=L.map('map',{
      center:[-1.254,-78.617],
      zoom:13,
      zoomControl:true,
      attributionControl:true
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '© OpenStreetMap contributors',
      maxZoom:18
    }).addTo(this.mapa)
 
    this.mapa.on('click', (e:L.LeafletMouseEvent)=>{
      this.agregarMarcadores(e.latlng)
    })
 
    this.agregarMarcadores(L.latLng(-1.254,-78.617), 'Marca en Ambato')
  }
 
  private agregarMarcadores(latLng:L.LatLng, texto?:string)
  {
    if(!this.mapa) return
   
    const marcador= L.marker(latLng, {icon:this.icono})
    .addTo(this.mapa)
 
    const textom= `Marcador ${this.marcadores.length + 1}<br>
                  Lat: ${latLng.lat.toFixed(6)}<br>
                  Lng: ${latLng.lng.toFixed(6)}`
    marcador.bindPopup(texto || textom)
   
    marcador.on('dblclick',()=>{
      this.limpiarMarcador(marcador)
    })
    this.marcadores.push(marcador)
 
  }
  private limpiarMarcador(marcador: L.Marker)
  {
    if(!this.mapa) return
 
    const index=this.marcadores.indexOf(marcador)
    if(index>-1)
    {
      this.mapa.removeLayer(marcador)
      this.marcadores.splice(index,1)
    }
  }
  public nmarcadores(): number {
  return this.marcadores.length
  }
 
  obtenerUbicacion()
  {
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(
        (posicion)=>{
          const lat= posicion.coords.latitude
          const lng= posicion.coords.longitude
          this.centrarMapa(lat, lng)
          this.agregarMarcadoresCoordenadas(lat, lng, 'ubicacion actual')
        },
        (error)=>{
          console.error('error al obtener la ubicacion:',error)
          alert('No se pudo obtener la ubicacion')
        }
      )
    }
    else{
      alert('Geolocalizacion no soportada')
    }
  }
  centrarMapa( lat:number, lng:number)
  {
    if(this.mapa)
    {
      this.mapa.setView([lat, lng], 13)
    }
  }
  public agregarMarcadoresCoordenadas( lat:number, lng:number, texto?:string)
  {
    this.agregarMarcadores(L.latLng(lat, lng), texto)
  }
  limpiarMarcadores()
  {
    this.marcadores.forEach(marcador=>{
      if(this.mapa)
      {
        this.mapa.removeLayer(marcador)
      }
    })
  }
}
 
 