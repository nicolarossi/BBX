#!/bin/bash

cat <<EOF
{"type":"FeatureCollection",
 "features":[
EOF

cat data/dive_site.csv | sed 's/"//'| grep -v "^id"| while read line ; do
    
    id=`echo "$line" | awk -F\; '{ print $1}'`
    description=`echo "$line" | awk -F\; '{ print $2}'`
    how_many_dives=`echo "$line" | sed 's/ //'| awk -F\; '{ print $3}'`
    lat=`echo "$line" | awk -F\; '{ print $4}'`
    lon=`echo "$line" | awk -F\; '{ print $5}'`

    echo "$comma"
    comma=","

    
    cat <<EOF
     {"type"	:"Feature",
	      "id":"$id ",
	      "properties":{
		  "id":"$id ",
                  "description" : "$description ",
                  "how_many_dives" : "$how_many_dives "
               },
               "geometry": { "type": "Point", "coordinates": [ $lon , $lat ]}  
     }
EOF

    
done

cat <<EOF
 ]}

EOF
