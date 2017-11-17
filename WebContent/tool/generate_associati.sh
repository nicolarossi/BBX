echo "var associati=[";

comma=""

find images/associati/ -type f | while read f; do
    echo " $comma { name : \"Name\" ,
      level : \"Fundamental\",
      image : \"$f\",
      female : \"false\"
    }"
    comma=","
    
done
echo "];"
