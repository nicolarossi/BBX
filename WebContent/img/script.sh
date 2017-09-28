

index=`cat index`

FILE=`printf "slide_%02d.png" $index`

cp "../PBTS_senza nomi_presentazione.png" $FILE

let index=index+1

echo $index | tee index

