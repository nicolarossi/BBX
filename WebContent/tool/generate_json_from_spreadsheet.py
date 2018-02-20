#!/usr/bin/env python
import urllib,sys, json
from openpyxl import load_workbook

def print_json(data,path):    
    with open(path, 'w') as outfile:
        json.dump(data, outfile)
    
def import_site(sheet,features,maps):
    print 'Import stations name:'

    for i in range(2,100):
        cell_key='A'+str(i)
        if ( sheet[cell_key].value  is None ):
            continue

        cell_key_up='A'+str(i-1)
        site_up=sheet[cell_key_up].value

        new_site=True

        site=sheet[cell_key].value
        if ( i > 2) and ( site == site_up ):
            print ("\t ["+site_up+"]")
            new_site=False
        
        feature={}
        feature['type']='Feature'        
        feature['id']=sheet[cell_key].value
        
        properties={}
        properties['id']=sheet[cell_key].value
        properties['description']=sheet['B'+str(i)].value
        properties['site_title']=sheet['A'+str(i)].value
        properties['how_many_dives']='1'

        
        geometry={}
        geometry['type']='Point'
        coordinates=[]
        coordinates.append(sheet['H'+str(i)].value)
        coordinates.append(sheet['G'+str(i)].value)
        geometry['coordinates']=coordinates
        
        feature['properties']=properties
        feature['geometry']=geometry
        print (cell_key+' > '+sheet[cell_key].value)

        if (new_site):
            features.append(feature)

        stations={}
        if site in maps :
            stations=maps[site]


        
        station_id=sheet['C'+str(i)].value
        if (station_id is None ):
            print('WARNING: Skip station for '+site+' because cell C'+str(i)+' is empty ')
            continue

        if (station_id in stations):
            print('ERROR: Skip station for '+site+' because cell C'+str(i)+' is not unique ')
            continue
        
        stations[station_id]={}
        stations[station_id]['description']=sheet['F'+str(i)].value
        stations[station_id]['depth']=sheet['G'+str(i)].value

        maps[site]=stations
        


def import_measurement(sheet,start_column_measurement,maps,measurement):
    print 'Import measurement :'

    for i in range(2,100):
        id_stations=sheet['B'+str(i)].value
        if (id_stations is None):
            print('WARNING: Cell B'+str(i)+' is empty it was expected?')
            return

        v=[]
        if (id_stations in measurement):
            v=measurement[id_stations]

        #--- Read measurement 
        measure={}

        list_measures=["Date", "Time", "Divers", "Depth (m)", "Visibility (m)", "Flow Intensity","Flow Direction(degree)", "Temperature (Celsius)","Compass Direction (Degrees)","Photo Distance (Mt)","URL/Photo Name","Bottom Type","Benthos (Species/Number)","Anthropic Impact","Fish (Species/Number)"]

        column='C'
        j=0
        for dim in list_measures:
#            print(x+' on column '+column )
            val_dim=sheet[column+str(i)].value
            if (val_dim is None):
                continue

            if (dim == "Time"):
                measure[dim]=''+str(val_dim.hour)+':'+str(val_dim.minute)
            elif (dim == "Date") :
                measure[dim]=''+str(val_dim.year)+'/'+str(val_dim.month)+'/'+str(val_dim.day)
            else:
                measure[dim]=val_dim

            column=chr(ord(column)+1)

            
        #--- insert in the local set of measurement 
        v.append(measure)

        #--- update the measurement for the stations read
        measurement[id_stations]=v
        

def main(argv):
    #------
    #--- Config parameter
    #-
    URL="https://docs.google.com/spreadsheets/d/1tSenu0DwUBuS66SxtqrxQfD25DnUPj4PI_2IafLin0M/export?format=xlsx"
    path_excel='pippo.xlsx'

    stations_title='Stazioni'
    measurement_title='Misurazioni'
    start_column_measurement='C'

    #----- TO DON'T TOUCH
    features= []
    dive_site = {}
    dive_site['type'] = 'FeatureCollection'
#
    #- Download the file
#    urllib.urlretrieve (URL, path_excel)

    
    # Manage the spreadsheet
    wb = load_workbook(path_excel)

    #print wb.get_sheet_names()
    maps={}
    
    for sheet in wb:
        if stations_title == sheet.title:
            import_site(sheet,features,maps)
            continue


    measurement={}
    for sheet in wb:
        if measurement_title == sheet.title:
            import_measurement(sheet,start_column_measurement,maps,measurement)

    #
    dive_site['features'] = features

    # print json format file
    print_json(dive_site,'data/dive_site.json')
    print_json(maps,'data/maps.json')
    print_json(measurement,'data/measurement.json')

   
if __name__ == "__main__":
    main(sys.argv)
        

    
