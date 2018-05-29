import fileinput,sys


for line in sys.stdin:
#    print(line)
    fields=line.replace(sys.argv[1],'').split('/')
    if (len(fields)<3):
        print('// Not parsable '+line.replace('\n',''))
        continue
    _id=fields[0]
    _type=fields[1]
#    _oth=fields[2].replace('\n','')
    _desc=fields[2].replace('\n','')
    _oth=line.replace('\n','')
#    print('mapping[index_of_station('+_id+')].'+_type+'["'+_oth+'"]=1')

    print('mapping[index_of_station('+_id+')].media.push({type:"img", url : "'+_oth+'", description : "'+_desc.capitalize()+'"})')
#    print(_type)
#    print(_oth)
#print(sys.argv[1])
