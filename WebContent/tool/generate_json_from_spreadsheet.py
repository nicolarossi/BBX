import urllib,sys, json,os
from openpyxl import load_workbook
from authentication_data import config_authentication
from wand.image import Image

def print_json(data,path):    
    with open(path, 'w') as outfile:
        json.dump(data, outfile)
    
def import_site(sheet,features,maps):
    print('Import stations name:')

    for i in range(2,100):
        cell_key='B'+str(i)
        if ( sheet[cell_key].value  is None ):
            continue

        cell_key_up='B'+str(i-1)
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
        properties['description']=sheet['C'+str(i)].value
        properties['site_title']=sheet['B'+str(i)].value
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


        station_id=sheet['A'+str(i)].value
        if (station_id is None ):
            print('WARNING: Skip station for '+site+' because cell A'+str(i)+' is empty ')
            continue

        if (station_id in stations):
            print('ERROR: Skip station for '+site+' because cell A'+str(i)+' is not unique ')
            continue
        
        stations[station_id]={}
        stations[station_id]['description']=sheet['E'+str(i)].value
        stations[station_id]['depth']=sheet['F'+str(i)].value

        maps[site]=stations
        


def import_measurement(sheet,start_column_measurement,maps,measurement,dropbox_folder,image_folder):
    name_of={}

    for dive_site in maps:
        for dive_station in maps[dive_site]:
            name_of[dive_station]=dive_site

    dropbox_radix="ProjectBaselineTyrrhenianSea/photos"

    print('Import measurement :')

    for i in range(2,100):
        print('Measurement/Row : '+str(i))
        id_stations=sheet['B'+str(i)].value
        if (id_stations is None):
            print('WARNING: Cell B'+str(i)+' is empty it was expected?')
            return

        v=[]
        if (id_stations in measurement):
            v=measurement[id_stations]

        #--- Read measurement 
        measure={}

      
        list_measures=["Site","Station Progressive Number","Date","Time","Divers","Depth (m)","Visibility (m)","Tools","Flow Intensity (High/Medium/Low)","Flow Direction (Degrees)","Temperature (Celsius)","Compass Direction (Degrees)","Photo Distance (Mt)","URL/Photo Name","Bottom Type","Benthos (Species/Number)","Anthropic Impact","Fish (Species/Number)"]

        column=chr(ord('A')-1)
        j=0
        
        for dim in list_measures:
            column=chr(ord(column)+1)
            if (dim == "Site" or dim == "Station Progressive Number"):
                continue
            val_dim = sheet[column+str(i)].value

            # Manage default value
            if (val_dim is None):
                if (dim=="Tools"):
                    val_dim="None"
                elif (dim=="Visibility (m)"):
                    val_dim=""
                elif (dim =="Temperature (Celsius)"):
                    val_dim=""
                elif (dim =="Time"):
                    val_dim="12:00"
                elif (dim == "Compass Direction (Degrees)"):
                    val_dim="n/a"
                elif (dim == "Compass Direction (Degrees)"):
                    val_dim="n/a"
                else:
                        print('In cell \t'+(column+str(i))+' is missing dim \t' + dim )
                        continue

            # manage non empty value
            if (dim == "Time"):
                try :
                    measure[dim]=''+str(val_dim.hour)+':'+str(val_dim.minute)
                except AttributeError:
                    f=val_dim.split(':')                    
                    try :
                        measure[dim]=''+f[0]+':'+f[1]
                    except AttributeError:
                        print(' ERROR on row '+str(i)+' for column Time ')
                        raise
                          
            elif (dim == "Date") :
                measure[dim]=''+str(val_dim.year)+'/'+str(val_dim.month)+'/'+str(val_dim.day)
            elif (dim == "URL/Photo Name"):
                # TODO
                # * costruire il path
                # * costruire l'alberatura locale
                # * scaricare il file
                # se non riesce a scaricare il file lancia un errore
                # * convertirlo in dimensione voluta
                # * mettere nel json la url
                measure['url']=''+name_of[id_stations]+'/'+val_dim+''

                if ((not (measure['url']).endswith('.jpg')) and (not (measure['url']).endswith('.jpeg'))):
                    measure['url']+='.jpg'
                
            else:
                measure[dim]=val_dim



        #---- Creare l'alberatura
        import_image_from_dropbox(dropbox_folder,image_folder,measure)

        #--- insert in the local set of measurement
        
        v.append(measure)

        #--- update the measurement for the stations read
        measurement[id_stations]=v

def import_image_from_dropbox(dropbox_folder,image_folder,measure):
    if ( not 'url' in measure):
        print(' missing ')
        return


        
    print(' Import image from dropbox folder...')
    
    dropbox_path=dropbox_folder+measure['url']

#    dest_format='png'
    
    tmp=image_folder+measure['url']

    dest_dir=os.path.dirname(tmp)
            
    dest_file = os.path.basename(image_folder+measure['url'])

    dest_path=dest_dir+'/'+dest_file

    dropbox_path=dropbox_path.replace('//','/')
    dest_path=dest_path.replace('//','/')

    print(' from : ['+dropbox_path+']')
    print(' to   : ['+dest_path+']')
    
    if (not os.path.exists(dest_dir)):
        os.makedirs(dest_dir)

    # Convert in dest_format
    if (not os.path.exists(dropbox_path)):
        print('ERRORE ')
        print('il file ['+dropbox_path+'] non e'' presente')
        sys.exit(-1)
                
    with Image(filename=dropbox_path) as original:
        with original.clone() as converted:
#            converted.format=dest_format
            converted.transform(resize='400x')
            
            converted.save(filename=dest_path)
            #                    (w,h)=original.size()
            #                    d_h= d_w*h/w
            #                   converted.resize(d_w,int(d_h))
            print('')




def main(argv):
    #------
    #--- Config parameter
    #-
    auth=config_authentication()
    URL=auth['URL']
    app_key=auth['app_key']
    app_secret=auth['app_secret']
    dropbox_token=auth['dropbox_token']
    dropbox_folder=auth['src_dropbox']+'/'
    image_folder=auth['dst_image']+'/'

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
    urllib.urlretrieve (URL, path_excel)

    
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
            import_measurement(sheet,start_column_measurement,maps,measurement,dropbox_folder,image_folder)

           
    #
    dive_site['features'] = features

    # print json format file
    print_json(dive_site,'data/dive_site.json')
    print_json(maps,'data/maps.json')
    print_json(measurement,'data/measurement.json')

    #-----
    #--- Download jpeg from dropbox and resize it ?
    #-
    
#    print('user :'+str(dbx.users_get_current_account()))


    
   
if __name__ == "__main__":
    main(sys.argv)
        

    
1
